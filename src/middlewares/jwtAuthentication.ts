import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import * as _ from 'lodash';

import { errors } from '../factory';
import { UserRepository } from '../repository/user';

export default function (db: SQLize) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const jwtSecret = process.env.JWT_SECRET || 'briswell-vn';

    try {
      const token = req.headers['authorization']!.split(' ')[1];

      const verified = verify(token, jwtSecret);
      if (verified) {
        const userController = new UserRepository(db);
        const user = await userController.getUserInfo(
          (verified as JwtPayload).id,
        );
        user ? (req.user = <any>user) : next(new errors.Unauthorized());
        next();
      } else {
        next(new errors.Unauthorized());
      }
    } catch (error) {
      next(new errors.Unauthorized());
    }
  };
}
