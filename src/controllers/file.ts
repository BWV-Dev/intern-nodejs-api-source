import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';
import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import formidable, { File } from 'formidable';
import fs from 'fs';
import { BAD_REQUEST, OK } from 'http-status';
import _ from 'lodash';
import path from 'path';
import { Op } from 'sequelize';
import { DataImportType, PayloadFormUpdate } from 'src/factory';

import { messages, Position, validatorMessages } from '../constants';
import { UserCreateDTO } from '../dto/user';
import * as mapper from '../mapper/user';
import { User } from '../models';
import { UserRepository } from '../repository/user';
import createClient from '../sequelize';
import { hashPassword } from '../utils/bcrypt';
import { toStringDate } from '../utils/common';
import BaseController from './_base';

class FileController extends BaseController {
  private readonly userRepo: UserRepository;

  constructor(db: SQLize) {
    super(db);
    this.userRepo = new UserRepository(this.db);

    this.exportCSV = this.nextWrapper(this.exportCSV);
    this.importCSV = this.nextWrapper(this.importCSV);
  }

  public exportCSV = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { rows } = await this.userRepo.search({
      ...mapper.searchData(req),
    });

    const newData = _.map(rows, (user) => {
      let position = null;
      position = Position[user.position_id];

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        groupId: user.group_id,
        groupName: user.group?.name,
        startedDate: user.started_date,
        position,
        createdDate: toStringDate(user.createdDate, 'YYYY-MM-DD'),
        updatedDate: toStringDate(user.updatedDate, 'YYYY-MM-DD'),
      };
    });

    stringify(
      newData,
      {
        quoted: true,
        quoted_empty: true,
      },
      (_error, output) => {
        const header = `"ID","User Name","Email","Group ID","Group Name","Started Date","Position","Created Date","Updated Date"\n`;
        const csv = header.concat(output);
        res.status(OK).end(csv);
      },
    );
  };

  public importCSV = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const t = await (await createClient()).transaction();

    const files = await this.handleUploadFileCSV(req);
    const fileName = files[0].newFilename;
    try {
      if (files[0].size > 1024 * 1024) {
        throw new Error(validatorMessages.EBT034('1MB'));
      }
      const data = (await this.readCSVFile(fileName)) as DataImportType[];

      const emails = data.map((item) => item.email);
      const ids = data.map((item) => {
        if (item.ID) {
          return item.ID;
        }
        return;
      });

      const isEqualEmail = await User.findAll({
        where: {
          [Op.or]: [
            {
              email: {
                [Op.in]: emails,
              },
            },
            {
              id: {
                [Op.in]: ids,
              },
            },
          ],
          deletedDate: {
            [Op.is]: null,
          },
        },
      });

      const isValidate = await this.validateCSVFormat(data, isEqualEmail);

      if (!_.isEmpty(isValidate.messages)) {
        throw isValidate.messages;
      }

      const mapperList = await this.mapperDataUpload(data);

      await User.bulkCreate(mapperList as any, {
        updateOnDuplicate: [
          'email',
          'name',
          'password',
          'group_id',
          'started_date',
          'position_id',
          'updatedDate',
          'deletedDate',
          'createdDate',
        ],
        transaction: t,
      });

      fs.unlinkSync(fileName);
      await t.commit();
      res.status(OK).json({
        messages: messages.EBT096,
      });
    } catch (error) {
      fs.unlinkSync(fileName);
      await t.rollback();
      res.status(BAD_REQUEST).json({
        messages: error,
      });
    }
  };

  public handleUploadFileCSV = async (req: Request) => {
    const options: formidable.Options = {
      uploadDir: path.resolve(),
      maxFields: 1,
      keepExtensions: true,
      filter: function ({ mimetype }) {
        const validMimtype = mimetype && mimetype.includes('text/csv');

        if (!validMimtype) {
          form.emit(
            'error' as any,
            new Error(validatorMessages.EBT033('CSV')) as any,
          );
          return false;
        }

        return true;
      },
    };
    const form = formidable(options);
    return new Promise<File[]>((resolve, reject) => {
      form.parse(req, (err, _fields, files) => {
        const file = files && files.csv;

        if (err) {
          return reject(err);
        }
        if (!file) {
          return reject(new Error('filesIsEmpty'));
        }

        resolve(files.csv as File[]);
      });
    });
  };

  public readCSVFile = (fileName: string): Promise<any> => {
    return new Promise((resolve) => {
      const temp: DataImportType[] = [];
      fs.createReadStream(fileName)
        .pipe(
          parse({
            delimiter: ',',
            from_line: 1,
            columns: true,
            skip_empty_lines: true,
            skip_records_with_empty_values: true,
            rtrim: true,
            cast: function (value) {
              if (value === '') {
                return null;
              }
              return value;
            },
          }),
        )
        .on('data', function (row) {
          temp.push(row);
        })
        .on('end', function () {
          resolve(temp);
        });
    });
  };

  public async validateCSVFormat(users: DataImportType[], usersDB: User[]) {
    const nameSet = new Set();
    const messagesList: string[] = [];
    const colHeader = [
      'ID',
      'email',
      'password',
      'name',
      'positionId',
      'groupId',
      'startedDate',
      'delete',
    ];

    const headers = Object.keys(users[0]);
    const checkFormatHeader = _.isEqual(colHeader, headers);

    if (!checkFormatHeader) {
      messagesList.push(validatorMessages.EBT095);
    }

    for (const [index, user] of users.entries()) {
      const dto = plainToClass(UserCreateDTO, user);
      const errors = await validate(dto as Record<string, any>);
      if (!_.isEmpty(errors)) {
        const objValues = Object.values(errors as any).map((string: any) => {
          const messages = Object.values(string.constraints)[0];
          return `Dòng ${index + 1}: ${messages}`;
        });
        messagesList.push(...objValues);
      }

      if (nameSet.has(user.email)) {
        messagesList.push(
          `Dòng ${index + 1}: ${validatorMessages.E009('Email')}`,
        );
      } else {
        nameSet.add(user.email);
      }

      for (let i = 0; i < usersDB.length; i++) {
        const element = usersDB[i];
        const userEqualList = [];
        const isEqualId = _.isEqual(Number(user.ID), element.id);
        const isEqualEmail = _.isEqual(user.email, element.email);

        if (users.length === 1) {
          if (isEqualId) {
            continue;
          }
        }

        if (isEqualId) {
          usersDB.splice(i, 1);
          continue;
        }
        if (isEqualEmail) {
          userEqualList.push(element);
        }
        if (!_.isEmpty(userEqualList)) {
          messagesList.push(
            `Dòng ${index + 1}: ${validatorMessages.E009('Email')}`,
          );
        }
      }
    }
    return { messages: messagesList };
  }

  public async mapperDataUpload(
    data: DataImportType[],
  ): Promise<PayloadFormUpdate[]> {
    const mapperList: PayloadFormUpdate[] = [];
    for (const item of data) {
      const temp: PayloadFormUpdate = {
        email: item.email,
        name: item.name,
        position_id: item.positionId,
        group_id: item.groupId,
        started_date: item.startedDate,
        password: await hashPassword(item.password),
      };

      if (!_.isNil(item.ID)) {
        temp.id = Number(item.ID);
        temp.updatedDate = dayjs().toString();
      }
      if (!_.isNil(item.ID) && !_.isNil(item.delete)) {
        temp.deletedDate = dayjs().toString();
      }

      mapperList.push(temp);
    }
    return mapperList;
  }
}

export default FileController;
