import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '../shared/constants/constants';
import { Entities } from './entity.index';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: DB_HOST,
        port: Number(DB_PORT),
        database: DB_DATABASE,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([...Entities]),
  ],
  exports: [TypeOrmModule.forFeature([...Entities])],
})
export class DatabaseModule {}
