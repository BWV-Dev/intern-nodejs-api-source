import * as _ from 'lodash';
import { FindOptions, IncludeOptions, Op, WhereOptions } from 'sequelize';

import { IUserSearchParams, UserForm } from '../factory/user';
import { hashPassword } from '../utils/bcrypt';
import { makeAmbiguousWhere } from '../utils/query';
import { BaseRepository } from './_base';

export class UserRepository extends BaseRepository {
  public readonly model: ACTModels['User'];
  constructor(db: SQLize) {
    super(db);
    this.model = this.models.User;
  }

  public async search(params: IUserSearchParams) {
    const findOption: FindOptions = this.makeFindOption(params);
    this.setOffsetLimit(findOption, params);

    const userList = await this.model.findAndCountAll(findOption);

    return userList;
  }

  public async searchById(params: string | number) {
    const findOption: FindOptions = this.makeFindOption();

    return this.model.findByPk(params, findOption);
  }

  private makeFindOption(params?: IUserSearchParams) {
    const groupInclude: IncludeOptions = {
      model: this.models.Group,
      attributes: ['id', 'name'],
    };

    const findOption: FindOptions = {
      include: [groupInclude],
      order: [['id', 'ASC']],
    };

    if (params) {
      const andArray: WhereOptions[] = [];

      if (!_.isNil(params.name)) {
        andArray.push(makeAmbiguousWhere(params, 'name'));
      }

      if (!_.isNil(params.dateFrom)) {
        andArray.push({
          started_date: { [Op.gte]: params.dateFrom },
        });
      }

      if (!_.isNil(params.dateTo)) {
        andArray.push({
          started_date: { [Op.lte]: params.dateTo },
        });
      }

      findOption.where = { [Op.and]: andArray };
    }

    return findOption;
  }

  public async create(data: UserForm) {
    try {
      const result = await this.model.create({
        email: data.email,
        name: data.name,
        group_id: data.groupId,
        position_id: data.positionId,
        started_date: data.startedDate,
        password: await hashPassword(data.password),
      });

      return { id: result.id };
    } catch (error) {
      throw error;
    }
  }
}
