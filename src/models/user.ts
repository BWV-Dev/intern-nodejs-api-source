import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';

import * as factory from '../factory/index';
import { Common } from './_common';
import { Group } from './group';

@Table({ tableName: 'user' })
export class User extends Common {
  @Column(DataType.STRING(255))
  email!: string;

  @Column(DataType.STRING(255))
  password!: string;

  @Column(DataType.STRING(100))
  name!: string;

  @ForeignKey(() => Group)
  @Column({ field: 'group_id', type: DataType.BIGINT.UNSIGNED })
  groupId!: number | bigint;

  @Column({ field: 'started_date', type: DataType.DATE })
  startedDate!: number;

  @Column({ field: 'position_id', type: DataType.TINYINT.UNSIGNED })
  positionId!: factory.Position;

  @BelongsTo(() => Group)
  group?: Group;
}
