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
    this.searchById = this.nextWrapper(this.searchById);
    this.create = this.nextWrapper(this.create);
    this.update = this.nextWrapper(this.update);
    this.delete = this.nextWrapper(this.delete);
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

  public update = async (req: Request, res: Response, _next: NextFunction) => {
    await this.userRepo.update(req.params.id, mapper.formDataCreate(req));

    this.noContent(res);
  };

  public delete = async (req: Request, res: Response, _next: NextFunction) => {
    await this.userRepo.delete(req.params.id);

    this.noContent(res);
  };
}

export default UserController;
