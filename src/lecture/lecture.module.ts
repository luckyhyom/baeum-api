import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from './lecture.controller';
import { LectureRepository } from './lecture.repository';
import { LectureService } from './lecture.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([LectureRepository]),
        ConfigModule
    ],
    controllers: [LectureController],
    providers: [
        LectureService
    ],
})
export class LectureModule {}
