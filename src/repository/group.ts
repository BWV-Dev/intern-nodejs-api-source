import { FindOptions, IncludeOptions } from 'sequelize';

import { ICommonSearchOption } from '../factory/_common';
import { BaseRepository } from './_base';

export class GroupRepository extends BaseRepository {
  public readonly model: ACTModels['Group'];
  constructor(db: SQLize) {
    super(db);
    this.model = this.models.Group;
  }

  public async search(params: ICommonSearchOption) {
    const findOption: FindOptions = this.makeFindOption();
    this.setOffsetLimit(findOption, params);

    const groupList = await this.model.findAndCountAll(findOption);

    return groupList;
  }

  private makeFindOption() {
    const userInclude: IncludeOptions = {
      model: this.models.User,
      attributes: ['name'],
    };

    const findOption: FindOptions = {
      include: [userInclude],
      order: [['id', 'ASC']],
    };

    return findOption;
  }

  public async list() {
    const findOption: FindOptions = {
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    };
    const groupList = await this.model.findAndCountAll(findOption);

    return groupList;
  }
}
