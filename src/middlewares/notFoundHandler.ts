import { NextFunction, Request, Response } from 'express';

import { NotFound } from '../factory/error';

export default (req: Request, _res: Response, next: NextFunction) => {
  next(new NotFound(`router for [${req.originalUrl}]`));
};
