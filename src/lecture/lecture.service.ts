import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lecture } from './lecture.entity';
import { LectureRepository } from './lecture.repository';
@Injectable()
export class LectureService {

    constructor(
        @InjectRepository(LectureRepository)
        private lectureRepository: LectureRepository,
    ){}

    getAll(): Promise<Lecture[]> {
        return  this.lectureRepository.getAll();
    }

    create(data: CreateLectureDto, user: User): Promise<Lecture> {
        const result = this.lectureRepository.createOne(data,user);
        return result;
    }

    getByTitle(title: string): Promise<Lecture> {
        return this.lectureRepository.getByTitle(title);
    }

    getById(id: number): Promise<Lecture> {
        return this.lectureRepository.getById(id);
    }

    updateOne(id: number, updateLectureDto: UpdateLectureDto): Promise<Lecture> {
        const target = this.getById(id);
        if (!target) {
            throw new Error("No lecture.");
        }
        return this.lectureRepository.updateOne(id, updateLectureDto);
    }
}
