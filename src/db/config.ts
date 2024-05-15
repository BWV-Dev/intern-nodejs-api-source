export = {
  development: {
    username: 'root',
    password: '1234',
    database: 'db_vue',
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+07:00',
  },
};
