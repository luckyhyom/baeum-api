import { TestingModule, Test } from "@nestjs/testing";
import { User } from "src/auth/user.entity";
import { CreateLectureDto } from "./dto/create-lecture.dto";
import { LectureController } from "./lecture.controller";
import { LectureService } from "./lecture.service";


// Test Class
describe('lecture Controller', () => {
    let controller: LectureController;
    let user;
    let lecture: CreateLectureDto;

    const mockService = {
        getAll: jest.fn().mockImplementation(),
        create: jest.fn((dto) => {
            return {
                id: Date.now(),
                ...dto
            }
        })
    }

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [LectureController],
            providers: [ LectureService ]
        })
        .overrideProvider(LectureService)
        .useValue(mockService)
        .compile();
        controller = moduleRef.get<LectureController>(LectureController);

        user = new User();
        lecture = {
            title: 'test',
            description: 'test',
            videoURL: 'test',
            author: 'tes',
            price: 2,
            viewStatus: true,
        }
    })

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })

    it('should create a lecture', async () => {
        expect(controller.createLecture(lecture,user))
        .toStrictEqual({   
            id: expect.any(Number),
            ...lecture
        })
        /**
         * TODO
         * 1. createDTO에서 author 제거하고 서버에서 조회하거나, 토큰에 유저 네임을 넣어 놔야 할까?
         * 
         * 2. 잘못된 데이터를 거르기 위해 User타입이 아닌 UserDTO로 변경해야할까?
         *  AuthGuard를 통해 쿠키에서 jwt를 추출하고 검증한 후 User라는 이름으로 Request에 객체를 삽입한다.
         *  그리고 jwt strategy 파일에서 payload에서 내가 원하는 데이터만 추출해서 반환 할 수 있도록 설정하면 되기에 dto는 필요 없을 것 같다.
         *  사실 잘 모르겠다. 일단 payload는 해커가 변경하기 힘들다. 으악
         */
    })

    describe('when it recieced wrong DTO', () => {
        /**
         * dto에 위반되는 데이터를 넣는 법은? 에러코드는 테스트코드가 아닌 dto를 보며 참고해야하는건가?
         * 이제 이런 책임은 dto에게 있는건가?
         */
        it('should return ? code', () => {
            // expect(controller.createLecture({...lecture, badCode: '<script>...</>'},user))
        })
    })

})