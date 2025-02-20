import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Entities } from './database/entity.index';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from './shared/constants/constants';

config();

export default new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*.js'],
  migrationsTableName: 'tb_migration',
  entities: [...Entities],
});
