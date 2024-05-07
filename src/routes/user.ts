import { Router } from 'express';

import UserController from '../controllers/user';
import { UserCreateDTO, UserUpdateDTO } from '../dto/user';
import { validationMiddleware } from '../middlewares/validation';

export default function (db: SQLize) {
  const userRouter = Router();
  const userController = new UserController(db);

  /**
   * User Search
   */
  userRouter.get('/', userController.search);

  /**
   * User SearchId
   */
  userRouter.get('/:id', userController.searchById);

  /**
   * User Create
   */
  userRouter.post(
    '/',
    validationMiddleware(UserCreateDTO),
    userController.create,
  );

  /**
   * User update
   */
  userRouter.put(
    '/:id([0-9]+)',
    validationMiddleware(UserUpdateDTO),
    userController.update,
  );

  /**
   * User delete
   */
  userRouter.delete('/:id([0-9]+)', userController.delete);

  return userRouter;
}
