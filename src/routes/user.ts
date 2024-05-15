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
    '/add',
    validationMiddleware(UserCreateDTO),
    userController.create,
  );

  /**
   * User Update
   */
  userRouter.patch(
    '/update/:id',
    validationMiddleware(UserUpdateDTO),
    userController.update,
  );

  /**
   * User Delete
   */
  userRouter.delete('/delete/:id', userController.delete);

  return userRouter;
}
