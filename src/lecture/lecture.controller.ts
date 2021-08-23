import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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

    @Get('/search')
    getByTitle(@Query('title') title: string): Lecture {
        return this.lectureService.getByTitle(title);
    }

    @Get('/:id')
    getById(@Param('id') id: number): Lecture {
        return this.lectureService.getById(id);
    }

    @Post('/')
    async createLecture(@Body() data: CreateLectureDto): Promise<Lecture> {
        return await this.lectureService.create(data);
    }
}
