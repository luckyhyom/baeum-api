import { Test, TestingModule } from "@nestjs/testing"
import { User } from "src/auth/user.entity"
import { Lecture } from "./lecture.entity"
import { LectureService } from "./lecture.service"
import { LectureRepository } from "./lecture.repository"
import { LectureSearchRequest } from "./dto/lecture-search-request.dto"

describe('lecture Service', () => {
    let service: LectureService;
    let dataBase: Lecture[] = [
        Lecture.createOne('test',new User()),
        Lecture.createOne('test',new User()),
        Lecture.createOne('test',new User()),
        Lecture.createOne('test',new User()),
        Lecture.createOne('test',new User()),
        Lecture.createOne('test',new User()),
        Lecture.createOne('test',new User()),
        Lecture.createOne('test',new User()),
        Lecture.createOne('test',new User()),
        Lecture.createOne('test',new User()),
    ]

    let mockRepository = {
        createOne: jest.fn((lecture, user) => {
            return {
                id: user.id,
                ...lecture,
                author: user.name
            }
        }),

        paging: jest.fn().mockImplementation(() => {
            return Promise.resolve([dataBase,dataBase.length]);
        })
    }

    beforeEach(async() => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                LectureService,
                {
                    provide: LectureRepository,
                    useValue: mockRepository
                }
            ]
        }).compile();

        service = moduleRef.get<LectureService>(LectureService)
    })

    it('should be defiend', () => {
        expect(service).toBeDefined()
    })

    describe('create Lecture', () => {
        it('should return a lecture', () => {
            const user = new User();
            user.id = 1;
            user.name = "김효민";

            const jwt = {
                id: user.id,
                name:user.name,
                token: ''
            }

            const title = 'test';
            const lectureDTO = Lecture.createOne(title,user);

            expect(service.create(lectureDTO,jwt)).toEqual({
                id: user.id,
                ...lectureDTO
            });
        })
    })

    describe('pagination', () => {
        const title: string = null;
        const pageNo: number = 1;
        const pageSize: number = 10;
        const queryString: LectureSearchRequest = LectureSearchRequest.create(title,pageNo,pageSize);

        const totalCount = dataBase.length;
        const totalPage = Math.ceil(pageSize/totalCount)

        it('should return totalPage', async () => {
            expect((await service.search(queryString)).totalPage).toBe(totalPage)
        })
    })
})