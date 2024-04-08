import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import * as _ from 'lodash';

import { errors } from '../factory';

export default (req: Request, _res: Response, next: NextFunction) => {
  const jwtSecret = process.env.JWT_SECRET || 'briswell-vn';

  try {
    const token = req.headers['authorization']!.split(' ')[1];

    const verified = verify(token, jwtSecret);
    if (verified) {
      next();
    } else {
      next(new errors.Unauthorized());
    }
  } catch (error) {
    next(new errors.Unauthorized());
  }
};
