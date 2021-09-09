import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ParamUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lecture } from './lecture.entity';
import { LectureService } from './lecture.service';
@Controller('lecture')
@UseGuards(AuthGuard('jwt'))
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
    createLecture(@Body() data: CreateLectureDto, @ParamUser() user: User): Promise<Lecture> {
        return this.lectureService.create(data, user);
    }

    @Patch(':id')
    patchLecture(@Param('id') id: number, @Body() updateLectureDto: UpdateLectureDto): Promise<Lecture> {
        return this.lectureService.updateOne(id, updateLectureDto);
    }
}
