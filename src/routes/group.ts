import { Router } from 'express';

import GroupController from '../controllers/group';

export default function (db: SQLize) {
  const groupRouter = Router();
  const groupController = new GroupController(db);

  groupRouter.get('/', groupController.search);

  groupRouter.get('/list', groupController.list);

  return groupRouter;
}
