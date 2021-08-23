import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { Lecture } from './lecture.model';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
    constructor(private lectureService: LectureService) {}

    @Get('/')
    getAllLectures(): Lecture[] {
        return this.lectureService.getAll();
    }

    @Post('/')
    async createLecture(@Body() data: CreateLectureDto): Promise<Lecture> {
        return await this.lectureService.create(data);
    }
}
