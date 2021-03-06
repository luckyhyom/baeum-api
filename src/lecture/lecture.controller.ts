import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ParamUser } from 'src/auth/user.decorator';
import { JwtDTO } from 'src/auth/dto/jwt.dto';
import { CreateLectureDTO } from './dto/create-lecture.dto';
import { LectureSearchRequest } from './dto/lecture-search-request.dto';
import { LectureSearchResponse } from './dto/lecture-search-response.dto';
import { UpdateLectureDTO } from './dto/update-lecture.dto';
import { Lecture } from './lecture.entity';
import { LectureService } from './lecture.service';
import { Page } from 'src/pagination/Page';

@Controller('lectures')
export class LectureController {
    constructor(private lectureService: LectureService) {}

    @Get()
    getAllLectures(@Req() request: Request): Promise<Lecture[]> {
        console.log(request.cookies);
        return this.lectureService.getAll();
    }
    
    @Get('/search')
    search(@Query() queryString: LectureSearchRequest): Promise<Page<LectureSearchResponse>> { // (1)
        const lectures = this.lectureService.search(queryString);
        
        if (!lectures) {
            throw new NotFoundException(`lectures are not exist`);;
        }
        return lectures;
    }

    @Get(':id')
    getById(@Param('id') id: number): Promise <Lecture> {
        const lecture = this.lectureService.findById(id);
        console.log(lecture);
        
        if (!lecture) {
            throw new NotFoundException(`lecture id ${id} is undefined`);
        }
        return lecture;
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createLecture(@Body() data: CreateLectureDTO, @ParamUser() user: JwtDTO): Promise<Lecture> {
        return this.lectureService.create(data, user);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    patchLecture(@ParamUser() user: JwtDTO, @Param('id') id: number, @Body() data: UpdateLectureDTO): Promise<Lecture> {
        return this.lectureService.updateLecture(user.id, id, data);
    }

    @Patch('trash/:id')
    @UseGuards(AuthGuard('jwt'))
    deleteLecture(@ParamUser() user: JwtDTO, @Param('id') id: number): Promise<{message:string}> {
        return this.lectureService.deleteLecture(user.id, id);
    }

    // @Post('thumbnail')
    // @UseGuards(AuthGuard('jwt'))
    // @UseInterceptors(
    //     AmazonS3FileInterceptor('thumbnail', {
    //         randomFilename: true,
    //         dynamicPath: 'lectures/thumbnail'
    //     }),
    // )
    // uploadThumbnail(@UploadedFile() file) {
    //     const thumbnail = file.Location;
    //     return { thumbnail };
    // }
}

/**
 * (1)
 * 쿼리스트링에 타입, 유효성 검사 적용하기
 * 
 * 타입을 넣지 않으면 모든 쿼리를 받을 수 있지만 유효성검사와 타입적용 불가능
 * ex) @Query() queryString
 * 
 * SearchLectureRequest는 클래스여서 class-Validation이 적용된다.
 * 현재 whiteList라는 유효성 검사를 하기때문에
 * SearchLectureRequest의 속성에는 데코레이터가 설정되어있어야한다.
 * ex) @Query() queryString: SearchLectureRequest
 * 
 * @Query() = req.query (객체)
 * @Query('title') = req.query['title'] (값)
 * 
 * @Query('title') test: SearchLectureRequest
 * 타입이 같지 않기때문에 맵핑되지 않는다. (value와 class를 맵핑하려하면 실패한다.)
 * Body()와 CreateDTO가 정상적으로 맵핑되는 이유는 둘다 객체이기 때문
 */