import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './configs/typeorm.config';
import { LectureModule } from './lecture/lecture.module';
import { AuthModule } from './auth/auth.module';

console.log(process.env.DB_USER);

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    LectureModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
