/**
 * sequelize
 */

import { Sequelize } from 'sequelize-typescript';

import * as models from './models';

const createClient = async () => {
  const host = process.env.DB_HOST as string;
  const port = +(process.env.DB_PORT as string);
  const username = process.env.DB_USER as string;
  const password = process.env.DB_PASS as string;
  const database = process.env.DB_NAME as string;

  const sequelize = new Sequelize({
    host,
    port,
    username,
    password,
    database,
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
    benchmark: true,
    logging: (sql, time) => {
      console.log(`${sql.replace(/\s\s+/g, ' ')} (took ${time}ms)`);
    },
    models: Object.values(models),
    timezone: '+07:00',
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('MySQL server connected');
    })
    .catch((err: any) => {
      console.log(`MySQL connection error ${err}`);
      process.exit(1);
    });

  return sequelize as unknown as SQLize;
};

export default createClient;
