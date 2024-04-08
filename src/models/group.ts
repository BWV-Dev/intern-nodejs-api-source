import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
} from 'sequelize-typescript';

import { Common } from './_common';
import { User } from './user';

@Table({ tableName: 'group' })
export class Group extends Common {
  @Column(DataType.STRING(255))
  name!: string;

  @Column(DataType.TEXT)
  note?: string;

  @ForeignKey(() => User)
  @Column({ field: 'group_leader_id', type: DataType.BIGINT.UNSIGNED })
  groupLeaderId!: number | bigint;

  @Column({ field: 'group_floor_number', type: DataType.INTEGER.UNSIGNED })
  groupFloorNumber!: number;

  @HasMany(() => User)
  user: User[];
}
