import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { User } from "src/auth/user.entity"
import config from "src/configs/config"
import { Lecture } from "./lecture.entity"
import { LectureRepository } from "./lecture.repository"
import { LectureSearchRequest } from "./dto/lecture-search-request.dto"

describe('lecture repository', () => {
    let repository: LectureRepository
    let entity: Lecture
    let mockRepository = {

    }
    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: config.db.host,
                    port: 5432,
                    username: config.db.username,
                    password: config.db.password,
                    database: config.db.database,
                    entities: [__dirname + '/../**/*.entity.{js,ts}'],
                    synchronize: true,
                    keepConnectionAlive: true
                }),
                TypeOrmModule.forFeature([Lecture, LectureRepository]),
            ],
            providers: [ LectureRepository ],
        }).compile();
        repository = moduleRef.get<LectureRepository>(LectureRepository);
        entity = moduleRef.get(getRepositoryToken(Lecture))
    })

    it('should be defined', () => {
        /**
         * 1. Repository 테스트는 가짜 DB를 memory처럼 사용한다.
         *    - 진짜 db가 아니기에 crud를 자유롭게 할 수 있다.
         *    - postgres는 되는지 모르겠다.
         * 2. 간편하게 함수를 테스트 할 수 있다.
         *    - 테스트코드를 쓰지 않고 함수를 테스트하기 위해 실행시키려면,
         *      app에서 import후 '프로젝트'를 계속 재실행시켜야한다... 말도안됨
         */

        expect(repository).toBeDefined();
    })
    it('shoud be..', async () => {
        const title: string = '';
        const pageNo: number = 1;
        const pageSize: number = 10;

        const req: LectureSearchRequest = LectureSearchRequest.create(title,pageNo,pageSize);
        const result = await repository.paging(req);
        const lectures = result[0];
        expect(lectures.length).toBe(10)
    })
})