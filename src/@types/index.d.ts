import { Sequelize } from 'sequelize';

import { IUserInfo } from '../factory/auth';
import * as models from '../models';

declare global {
  namespace Express {
    interface User extends IUserInfo {}
    export interface Request {
      user: User;
    }
  }

  type ACTModels = typeof models;
  type ACTInstances = {
    [i in keyof ACTModels]: InstanceType<ACTModels[i]>;
  };
  type SQLize = Sequelize & {
    models: ACTModels;
  };

  type AbstractRequest = {
    query: any;
    body: any;
    user?: IUserInfo;
  };
}
