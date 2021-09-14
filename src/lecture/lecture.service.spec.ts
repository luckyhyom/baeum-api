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
                id: Date.now(),
                ...lecture
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
            const title = 'test';
            const lecture = Lecture.createOne(title,user);

            expect(service.create(lecture,user)).toEqual({
                id: expect.any(Number),
                ...lecture
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