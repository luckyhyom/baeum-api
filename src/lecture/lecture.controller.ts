import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lecture } from './lecture.entity';
import { LectureService } from './lecture.service';
@Controller('lecture')
export class LectureController {
    constructor(private lectureService: LectureService) {}

    @Get()

    getAllLectures(@Req() request: Request): Promise<Lecture[]> {
        console.log(request.cookies);
        return this.lectureService.getAll();
    }

    @Get('/search')
    getByTitle(@Query('title') title: string): Promise <Lecture> {
        const lecture = this.lectureService.getByTitle(title);
        if (!lecture) {
            throw new NotFoundException(`lecture title ${title} is undefined`);;
        }
        return lecture;
    }

    @Get(':id')
    getById(@Param('id') id: number): Promise <Lecture> {
        const lecture = this.lectureService.getById(id);
        console.log(lecture);
        
        if (!lecture) {
            throw new NotFoundException(`lecture id ${id} is undefined`);
        }
        return lecture;
    }

    @Post()
    createLecture(@Body() data: CreateLectureDto): Promise<Lecture> {
        console.log(data);
        return this.lectureService.create(data);
    }

    @Patch(':id')
    patchLecture(@Param('id') id: number, @Body() updateLectureDto: UpdateLectureDto): Promise<Lecture> {
        return this.lectureService.updateOne(id, updateLectureDto);
    }
}
