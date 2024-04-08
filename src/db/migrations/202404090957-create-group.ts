import { DataTypes, literal, QueryInterface } from 'sequelize';

export default {
  up: async (qi: QueryInterface, dataTypes: typeof DataTypes) => {
    await qi.createTable('group', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.BIGINT.UNSIGNED,
      },
      name: {
        allowNull: false,
        type: dataTypes.STRING(255),
      },
      note: {
        type: dataTypes.TEXT,
      },
      group_leader_id: {
        allowNull: false,
        type: dataTypes.BIGINT.UNSIGNED,
      },
      group_floor_number: {
        allowNull: false,
        type: dataTypes.INTEGER.UNSIGNED,
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
      await qi.addConstraint('group', {
        fields: ['group_leader_id'],
        type: 'foreign key',
        name: 'groupLeaderUserFK',
        references: {
          table: 'user',
          field: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      });
  },
  down: async (qi: QueryInterface) => {
    await qi.removeConstraint('group', 'groupLeaderUserFK');
    await qi.dropTable('group');
  },
};
