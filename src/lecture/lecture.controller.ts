import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
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
        const lecture = this.lectureService.getByTitle(title);
        if (!lecture) {
            throw new NotFoundException(`lecture title ${title} is undefined`);;
        }
        return lecture;
    }

    @Get('/:id')
    getById(@Param('id') id: number): Lecture {
        const lecture = this.lectureService.getById(id);
        console.log(lecture);
        
        if (!lecture) {
            throw new NotFoundException(`lecture id ${id} is undefined`);
        }
        return lecture;
    }

    @Post('/')
    async createLecture(@Body() data: CreateLectureDto): Promise<Lecture> {
        return await this.lectureService.create(data);
    }
}
