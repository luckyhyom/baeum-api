import { Test, TestingModule } from "@nestjs/testing"
import { User } from "src/auth/user.entity"
import { CreateLectureDto } from "./dto/create-lecture.dto"
import { LectureRepository } from "./lecture.repository"
import { LectureService } from "./lecture.service"
import sampleLecture from 'src/lecture/dto/create-lecture.sample.dto'

describe('lecture Service', () => {
    let service: LectureService;
    let lecture = sampleLecture;
    
    let mockRepository = {
        createOne: jest.fn((lecture, user) => {
            return {
                id: Date.now(),
                ...lecture
            }
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
            expect(service.create(lecture,new User())).toEqual({
                id: expect.any(Number),
                ...lecture
            });
        })
    })
})