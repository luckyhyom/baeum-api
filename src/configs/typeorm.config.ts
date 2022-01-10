import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import config from "./config";


export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: config.db.host,
    port: config.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}


export const SQLiteConfig: TypeOrmModuleOptions = {
    type: 'better-sqlite3',
    database: ':memory:',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    // logging: true,
    keepConnectionAlive: true,
}