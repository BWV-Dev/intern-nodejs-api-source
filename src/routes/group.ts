import { Router } from 'express';

import GroupController from '../controllers/group';
import { Position } from '../factory/user';
import { routeGuard } from '../middlewares/routeGuard';

export default function (db: SQLize) {
  const groupRouter = Router();
  const groupController = new GroupController(db);

  groupRouter.get('/', routeGuard([Position.Director]), groupController.search);

  groupRouter.get(
    '/list',
    routeGuard([
      Position.Director,
      Position.Group,
      Position.Leader,
      Position.Member,
    ]),
    groupController.list,
  );

  return groupRouter;
}
