import { NextFunction, Request, Response } from 'express';

import * as mapper from '../mapper/user';
import { UserRepository } from '../repository/user';
import BaseController from './_base';

class UserController extends BaseController {
  private readonly userRepo: UserRepository;

  constructor(db: SQLize) {
    super(db);
    this.userRepo = new UserRepository(this.db);

    this.search = this.nextWrapper(this.search);
  }

  public search = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await this.userRepo.search({
      ...mapper.searchData(req),
      ...this.getOffsetLimit(req),
    });

    this.ok(res, result);
  };

  public searchById = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const result = await this.userRepo.searchById(req.params.id);

    res.json(result);
  };

  public create = async (req: Request, res: Response, _next: NextFunction) => {
    const result = await this.userRepo.create(mapper.formDataCreate(req));

    this.created(res, result);
  };
}

export default UserController;
