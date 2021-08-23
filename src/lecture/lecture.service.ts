import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { Lecture } from './lecture.model';
@Injectable()
export class LectureService {

    private lectures: Lecture[] = [];

    getAll(): Lecture[] {
        return  this.lectures;
    }

    async create(data: CreateLectureDto): Promise<Lecture> {
        await this.lectures.push({
            id: this.lectures.length + 1,
            ...data,
        })
        return this.lectures[ this.lectures.length - 1 ];
    }
}
