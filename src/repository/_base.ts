import _ from 'lodash';
import * as Sequelize from 'sequelize';

export abstract class BaseRepository {
  public readonly db: SQLize;
  public readonly models: ACTModels;

  constructor(db: SQLize) {
    this.db = db;
    this.models = db.models;
  }

  protected setOffsetLimit(
    findOptions: Sequelize.FindOptions,
    option?: { offset?: string | number; limit?: string | number },
  ) {
    if (option !== undefined) {
      if (!isNaN(Number(option.offset)) && option.offset !== '') {
        findOptions.offset = Number(option.offset);
      }

      if (!isNaN(Number(option.limit)) && option.limit !== '') {
        findOptions.limit = Number(option.limit);
      }
    }
  }
}
