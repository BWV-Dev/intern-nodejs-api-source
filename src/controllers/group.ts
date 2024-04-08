import { NextFunction, Request, Response } from 'express';

import { GroupRepository } from '../repository/group';
import BaseController from './_base';

class GroupController extends BaseController {
  private readonly groupRepo: GroupRepository;

  constructor(db: SQLize) {
    super(db);
    this.groupRepo = new GroupRepository(this.db);

    this.search = this.nextWrapper(this.search);
  }
  public search = async (req: Request, res: Response, _next: NextFunction) => {
    const result: any = await this.groupRepo.search({
      ...this.getOffsetLimit(req),
    });

    this.ok(res, result);
  };
}

export default GroupController;
