import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateLectureDto } from "./dto/create-lecture.dto";
import { UpdateLectureDto } from "./dto/update-lecture.dto";
import { Lecture } from "./lecture.entity";

@EntityRepository(Lecture)
export class LectureRepository extends Repository<Lecture> {
    async getAll(): Promise<Lecture[]> {
        return await this.find();
    }

    async createOne(data: CreateLectureDto, user: User): Promise<Lecture> {
        const result = await this.create({ ...data, user: { id: user.id } });
        await this.save(result);
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