import * as _ from 'lodash';

import { errors } from '../factory';
import { ILoginParams } from '../factory/auth';
import { comparePassword } from '../utils/bcrypt';
import { BaseRepository } from './_base';

export class AuthReposiroty extends BaseRepository {
  public readonly model: ACTModels['User'];
  constructor(db: SQLize) {
    super(db);
    this.model = this.models.User;
  }

  public async login(params: ILoginParams) {
    const user = await this.model.findOne({
      where: {
        email: params.email,
      },
    });

    if (_.isNil(user)) {
      throw new errors.Argument(
        'email, password',
        'Email or password incorrectly',
      );
    }

    const isMatchPassword = await comparePassword(
      params.password,
      user.password,
    );

    if (!isMatchPassword) {
      throw new errors.Argument(
        'email, password',
        'Email or password incorrectly',
      );
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      positionId: user.positionId,
    };
  }
}
