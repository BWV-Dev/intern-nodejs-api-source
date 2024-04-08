import { NextFunction, Request, Response } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import * as _ from 'lodash';
import { ValidationError } from 'sequelize';

import * as errors from '../factory/error';

export default (err: any, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof ValidationError) {
    res.status(UNPROCESSABLE_ENTITY).json({
      errors: _.map(err.errors, 'message'),
    });
  } else {
    let responseError = err;
    if (!(err instanceof errors.Error)) {
      responseError = new errors.Error('InternalServerError', err.message);
    }

    const json: any = {};
    if (err instanceof errors.Info) {
      json.info = responseError.message;
    } else {
      json.message = responseError.message;
    }

    res.status(responseError.httpStatus).json(json);
  }
};
