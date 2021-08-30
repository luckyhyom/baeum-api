import { EntityRepository, Repository } from "typeorm";
import { CreateLectureDto } from "./dto/create-lecture.dto";
import { UpdateLectureDto } from "./dto/update-lecture.dto";
import { Lecture } from "./lecture.entity";

@EntityRepository(Lecture)
export class LectureRepository extends Repository<Lecture> {
    async getAll(): Promise<Lecture[]> {
        return await this.find();
    }

    async createOne(data: CreateLectureDto): Promise<Lecture> {
        const result = await this.create(data);
        this.save(result);
        return result;
    }

    async getByTitle(title: string): Promise<Lecture> {
        return await this.findOne(title);
    }

    async getById(id: number): Promise<Lecture> {
        return await this.findOne(id);
    }

    async updateOne(id: number, updateLectureDto: UpdateLectureDto): Promise<Lecture> {
        await this.update(id, updateLectureDto);
        return await this.getById(id);
    }
}