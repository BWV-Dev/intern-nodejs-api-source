import { Router } from 'express';

import apiErrorHandler from '../middlewares/apiErrorHandler';
import jwtAuthentication from '../middlewares/jwtAuthentication';
import notFoundHandler from '../middlewares/notFoundHandler';
import authRouter from './auth';
import groupRouter from './group';
import userRouter from './user';

export default function (db: SQLize) {
  const router = Router();
  router.use('/auth', authRouter(db));

  router.use(jwtAuthentication);
  router.use('/user', userRouter(db));
  router.use('/group', groupRouter(db));

  router.use(notFoundHandler);
  router.use(apiErrorHandler);

  return router;
}
