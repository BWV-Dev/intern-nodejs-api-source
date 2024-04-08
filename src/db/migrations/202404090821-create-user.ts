import { DataTypes, literal, QueryInterface } from 'sequelize';

export default {
  up: async (qi: QueryInterface, dataTypes: typeof DataTypes) =>
    qi.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT.UNSIGNED,
      },
      email: {
        allowNull: false,
        type: dataTypes.STRING(255),
      },
      password: {
        allowNull: false,
        type: dataTypes.STRING(255),
      },
      name: {
        allowNull: false,
        type: dataTypes.STRING(100),
      },
      group_id: {
        allowNull: false,
        type: dataTypes.BIGINT.UNSIGNED,
      },
      started_date: {
        allowNull: false,
        type: dataTypes.DATEONLY,
      },
      position_id: {
        allowNull: false,
        type: dataTypes.TINYINT.UNSIGNED,
      },
      created_date: {
        allowNull: false,
        type: dataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updated_date: {
        allowNull: false,
        type: dataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      deleted_date: {
        type: dataTypes.DATE,
      },
    }),
  down: (qi: QueryInterface) => qi.dropTable('user'),
};
