import dotenv from 'dotenv';
import path from 'path';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const isDev = process.env.NODE_ENV === 'development';

dotenv.config();
const sequelizeOptions: SequelizeOptions = {
  host: isDev ? 'localhost' : 'postgres',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres',
  models: [path.resolve(__dirname, './models')],
};

const sequelize = new Sequelize(sequelizeOptions);
export default sequelize;
