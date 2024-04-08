import { literal, QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('user', [
      {
        email: 'director@gmail.com',
        password:
          '$2y$10$lPVsX7/UiC4h/sjGKFu4a.Lyjw.FPpOb0Z6HRSRzMfXPldEJ3gMzO',
        name: 'Director',
        group_id: 1,
        started_date: literal('CURRENT_TIMESTAMP'),
        position_id: 0,
      },
      {
        email: 'groupleader@gmail.com',
        password:
          '$2y$10$lPVsX7/UiC4h/sjGKFu4a.Lyjw.FPpOb0Z6HRSRzMfXPldEJ3gMzO',
        name: 'Group Leader',
        group_id: 2,
        started_date: literal('CURRENT_TIMESTAMP'),
        position_id: 1,
      },
      {
        email: 'leader@gmail.com',
        password:
          '$2y$10$lPVsX7/UiC4h/sjGKFu4a.Lyjw.FPpOb0Z6HRSRzMfXPldEJ3gMzO',
        name: 'Leader',
        group_id: 3,
        started_date: literal('CURRENT_TIMESTAMP'),
        position_id: 2,
      },
      {
        email: 'member@gmail.com',
        password:
          '$2y$10$lPVsX7/UiC4h/sjGKFu4a.Lyjw.FPpOb0Z6HRSRzMfXPldEJ3gMzO',
        name: 'Member',
        group_id: 4,
        started_date: literal('CURRENT_TIMESTAMP'),
        position_id: 3,
      },
    ]),
  down: (queryInterface: QueryInterface) =>
    queryInterface.bulkDelete('user', {
      email: [
        'director@gmail.com',
        'groupleader@gmail.com',
        'leader@gmail.com',
        'member@gmail.com',
      ],
    }),
};
