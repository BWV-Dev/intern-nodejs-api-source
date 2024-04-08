import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import * as _ from 'lodash';
import { ParsedQs } from 'qs';

export function validationMiddleware<T>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const isMethodGet = req.method === 'GET' ? true : false;
    const dto = plainToClass(dtoClass, isMethodGet ? req.query : req.body);

    const errors = await validate(dto as Record<string, any>);

    if (!_.isEmpty(errors)) {
      const errorMessages = _.flatten(
        _.map(errors, (error) => Object.values(error.constraints || {})),
      );

      return res.status(UNPROCESSABLE_ENTITY).json({ errors: errorMessages });
    } else {
      if (isMethodGet) {
        req.query = dto as unknown as ParsedQs;
      } else {
        req.body = dto;
      }
      return next();
    }
  };
}
