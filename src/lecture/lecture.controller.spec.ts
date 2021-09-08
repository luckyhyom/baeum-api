import { TestingModule, Test } from "@nestjs/testing";
import { AuthModule } from "src/auth/auth.module";
import { ParamUser } from "src/auth/user.decorator";
import { LectureController } from "./lecture.controller";
import { LectureService } from "./lecture.service";


// Test Class
describe('lecture Controller', () => {
    let controller: LectureController;
    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule
            ],
            controllers: [LectureController],
            providers: [
                { 
                    provide: LectureService,
                    useValue: {
                        getAllLectures: jest.fn()
                    }
                },
                {
                    provide: ParamUser,
                    useValue: {
                            id:'',
                    }
                }
            ],
        })
        .compile();
        controller = moduleRef.get<LectureController>(LectureController);
        let service = moduleRef.get<LectureService>(LectureService);        
    })

    it('should return a lecture', () => {
        expect(controller).toBeDefined();
    })
})

// expect(controller.getById(1)).toBe({
//     id: 1,
//     title: 'string',
//     description: 'string',
//     videoURL: 'string',
//     author: 'string',
//     price: 1,
//     viewStatus: true,
//     userId: 1,
// })