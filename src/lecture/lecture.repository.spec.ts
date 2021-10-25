import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { User } from "src/auth/user.entity"
import { Lecture } from "./lecture.entity"
import { LectureRepository } from "./lecture.repository"
import { LectureSearchRequest } from "./dto/lecture-search-request.dto"
import { SQLiteConfig } from "src/configs/typeorm.config"
import { CreateLectureDTO } from "./dto/create-lecture.dto"
import { UserRepository } from "src/auth/user.repository"

describe('lecture repository', () => {
    let repository: LectureRepository
    let userRepository: UserRepository

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(SQLiteConfig),
                TypeOrmModule.forFeature([Lecture, LectureRepository, User, UserRepository ]),
            ],
            providers: [ LectureRepository ],
        }).compile();
        repository = moduleRef.get<LectureRepository>(LectureRepository);
        userRepository = moduleRef.get<UserRepository>(UserRepository);
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

    describe('Create and paging',() => {
        it('shoud return Lastest Lecture Number', async () => {
            const title: string = '';
            const pageNo: number = 1;
            const pageSize: number = 10;
    
            const req: LectureSearchRequest = LectureSearchRequest.create(title,pageNo,pageSize);
    
            const newUser = await userRepository.createUser({
                userId:'testuser01',
                password:'test12312',
                name:'khm',
                about:'tests',
                email:'bs_khm@naver.com',
            });
    
            // 20 is going to be Latest Lecture's ID
            const totalCount = 20;
            for (let i = 0; i <= totalCount; i++) {
                await repository.createOne(CreateLectureDTO.create(`No.${i} Javascripts`),{id:newUser.id,name:newUser.name,token:''})
            }

            const result = await repository.paging(req);
            const lectures = result[0];

            // expect(lectures.length).toBe(10)
            expect(lectures[0].title).toBe(`No.${totalCount} Javascripts`)
        })
    })

})