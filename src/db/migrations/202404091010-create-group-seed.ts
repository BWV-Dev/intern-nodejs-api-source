import { QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('group', [
      {
        name: 'Director',
        note: null,
        group_leader_id: 1,
        group_floor_number: 1,
      },
      {
        name: 'Group Leader',
        note: 'Demo note',
        group_leader_id: 2,
        group_floor_number: 2,
      },
      {
        name: 'Leader',
        note: null,
        group_leader_id: 3,
        group_floor_number: 3,
      },
      {
        name: 'Member',
        note: null,
        group_leader_id: 4,
        group_floor_number: 4,
      },
    ]),
  down: (queryInterface: QueryInterface) =>
    queryInterface.bulkDelete('group', {
      name: ['Director', 'Group Leader', 'Leader', 'Member'],
    }),
};
