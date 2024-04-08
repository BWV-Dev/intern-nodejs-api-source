import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';

export class Common extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id!: number | bigint;

  @CreatedAt
  @Column({ field: 'created_date' })
  createdDate!: Date;

  @UpdatedAt
  @Column({ field: 'updated_date' })
  updatedDate!: Date;

  @DeletedAt
  @Column({ field: 'deleted_date' })
  deletedDate?: Date;
}
