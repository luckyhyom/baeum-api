import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { Lecture } from './lecture.entity';
@Injectable()
export class LectureService {

    private lectures: Lecture[] = [];

    getAll(): Lecture[] {
        return  this.lectures;
    }

    async create(data: CreateLectureDto): Promise<Lecture> {

        return this.lectures[ this.lectures.length - 1 ];
    }

    getByTitle(title: string): Lecture {
        return this.lectures.find(lecture => lecture.title === title);
    }

    getById(id: number): Lecture {
        return this.lectures.find(lecture => lecture.id === id);
    }
}
