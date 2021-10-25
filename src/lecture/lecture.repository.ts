import { createQueryBuilder, EntityRepository, Repository } from "typeorm";
import { JwtDTO } from "src/auth/dto/jwt.dto";
import { CreateLectureDTO } from "./dto/create-lecture.dto";
import { LectureSearchRequest } from "./dto/lecture-search-request.dto";
import { UpdateLectureDTO } from "./dto/update-lecture.dto";
import { Lecture } from "./lecture.entity";

@EntityRepository(Lecture)
export class LectureRepository extends Repository<Lecture> {
    async getAll(): Promise<Lecture[]> {
        return await createQueryBuilder()
            .select([
                'lecture.id',
                'lecture.title',
                'lecture.description',
                'lecture.thumbnail',
                'lecture.price',
                'lecture.author',
                'lecture.userId'
            ])
            .from(Lecture,'lecture')
            .orderBy('lecture.id', 'DESC')
            .getMany()

    }

    async createOne(data: CreateLectureDTO, user: JwtDTO): Promise<Lecture> {
        const result = await this.create({
            ...data,
            author: user.name,
            viewStatus: true,
            user: { id: user.id }
        });
        await this.save(result);
        return result;
    }

    async getByTitle(title: string): Promise<Lecture> {
        return await this.findOne({title});
    }

    async getById(id: number): Promise<Lecture> {
        return await this.findOne(id);
    }

    async updateOne(id: number, updateLectureDTO: UpdateLectureDTO): Promise<Lecture> {
        await this.update(id, updateLectureDTO);
        return await this.getById(id);
    }

    paging(queryString: LectureSearchRequest): Promise<[Lecture[], number]> {
        // 형태의 차이 일 뿐 가독성이 좋은 것으로 하면 된다.
        const queryBuilder = createQueryBuilder()
            .select([
                'lecture.id',
                'lecture.title',
                'lecture.description',
                'lecture.thumbnail',
                'lecture.price',
                'lecture.author',
                'lecture.userId'
            ])
            .from(Lecture, 'lecture')
            .orderBy('lecture.id', 'DESC')
            .limit(queryString.getLimit())
            .offset(queryString.getOffset());
            
            if(queryString.hasTitle()) {
                queryBuilder.andWhere("lecture.title like :title", {title: `%${queryString.title}%`});
            }
        return queryBuilder
            // .disableEscaping()
            .getManyAndCount();
    }
}