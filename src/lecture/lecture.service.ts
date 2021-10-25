import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './lecture.entity';
import { JwtDTO } from 'src/auth/dto/jwt.dto';
import { CreateLectureDTO } from './dto/create-lecture.dto';
import { UpdateLectureDTO } from './dto/update-lecture.dto';
import { LectureSearchRequest } from './dto/lecture-search-request.dto';
import { LectureSearchResponse } from './dto/lecture-search-response.dto';
import { LectureRepository } from './lecture.repository';
import { Page } from 'src/pagination/Page';

@Injectable()
export class LectureService {

    constructor(
        @InjectRepository(LectureRepository)
        private lectureRepository: LectureRepository,
    ){}

    getAll(): Promise<Lecture[]> {
        return  this.lectureRepository.getAll();
    }

    create(data: CreateLectureDTO, user: JwtDTO): Promise<Lecture> {
        const result = this.lectureRepository.createOne(data,user);
        return result;
    }

    async findById(lectureId: number) {
        return await this.lectureRepository.findById(lectureId);
    }

    async search(queryString: LectureSearchRequest): Promise<Page<LectureSearchResponse>> {
        const lectures = await this.lectureRepository.paging(queryString)
        // DB에서 가져온 데이터를 그대로 보내지 않고, DTO를 정의하여 데이터를 적절하게 가공한다.
        return new Page<LectureSearchResponse>(lectures[1],queryString.getLimit(),lectures[0].map(lecture => new LectureSearchResponse(lecture)));
    }
    
    async updateLecture(userId: number, lectureId: number, data: UpdateLectureDTO): Promise<Lecture> {
        const lecture = await this.lectureRepository.findById(lectureId);

        if(userId !== lecture.userId) {
            new HttpException('you are not allowed to update this board.', HttpStatus.UNAUTHORIZED)
        }
        await this.lectureRepository.updateOne(lectureId, data);
        return await this.lectureRepository.findById(lectureId);
    }
}
