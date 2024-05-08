import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { AuthReposiroty } from '../repository/auth';
import BaseController from './_base';

class AuthController extends BaseController {
  private readonly authRepo: AuthReposiroty;

  private readonly jwtSecret: string = process.env.JWT_SECRET || 'briswell-vn';
  private readonly expiresIn: string = process.env.JWT_EXPIRATION || '1800s';

  constructor(db: SQLize) {
    super(db);
    this.authRepo = new AuthReposiroty(this.db);

    this.login = this.nextWrapper(this.login);
  }

  public login = async (req: Request, res: Response, _next: NextFunction) => {
    const user = await this.authRepo.login({
      email: req.body.email,
      password: req.body.password,
    });

    const token = await this.signToken({
      id: Number(user.id),
      name: user.name,
      positionId: Number(user.positionId),
    });

    res.json({
      ...user,
      token,
    });

    req.user = <any>user;
  };

  public signToken = async (data: {
    id: number;
    name: string;
    positionId: number;
  }) => {
    return sign(data, this.jwtSecret, {
      expiresIn: this.expiresIn,
    });
  };

  public me = async (req: Request, res: Response, _next: NextFunction) => {
    const user = await this.authRepo.me(req.params.id);

    const token = await this.signToken({
      id: Number(user.id),
      name: user.name,
      positionId: Number(user.positionId),
    });

    res.json({
      ...user,
      token,
    });

    req.user = <any>user;
  };
}

export default AuthController;
