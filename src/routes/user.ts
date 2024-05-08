import { Router } from 'express';

import UserController from '../controllers/user';
import { UserCreateDTO, UserUpdateDTO } from '../dto/user';
import { Position } from '../factory/user';
import { routeGuard } from '../middlewares/routeGuard';
import { validationMiddleware } from '../middlewares/validation';

export default function (db: SQLize) {
  const userRouter = Router();
  const userController = new UserController(db);

  /**
   * User Search
   */
  userRouter.get(
    '/',
    routeGuard([
      Position.Director,
      Position.Group,
      Position.Leader,
      Position.Member,
    ]),
    userController.search,
  );

  /**
   * User SearchId
   */
  userRouter.get(
    '/:id([0-9]+)',
    routeGuard([
      Position.Director,
      Position.Group,
      Position.Leader,
      Position.Member,
    ]),
    userController.searchById,
  );

  /**
   * User Create
   */
  userRouter.post(
    '/',
    routeGuard([Position.Director]),
    validationMiddleware(UserCreateDTO),
    userController.create,
  );

  /**
   * User update
   */
  userRouter.put(
    '/:id([0-9]+)',
    routeGuard([
      Position.Director,
      Position.Group,
      Position.Leader,
      Position.Member,
    ]),
    validationMiddleware(UserUpdateDTO),
    userController.update,
  );

  /**
   * User delete
   */
  userRouter.delete(
    '/:id([0-9]+)',
    routeGuard([
      Position.Director,
      Position.Group,
      Position.Leader,
      Position.Member,
    ]),
    userController.delete,
  );

  return userRouter;
}
