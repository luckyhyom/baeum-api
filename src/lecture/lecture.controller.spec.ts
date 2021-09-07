import { TestingModule, Test } from "@nestjs/testing";
import { LectureController } from "./lecture.controller";
import { Lecture } from "./lecture.entity";
import { LectureRepository } from "./lecture.repository";
import { LectureService } from "./lecture.service";


// Test Class
describe('lecture Controller', () => {
    let controller: LectureController;
    let service = new LectureService(new(class extends LectureRepository{})()).getAll = jest.fn();
    // beforeEach(async () => {
    //     const moduleRef: TestingModule = await Test.createTestingModule({
    //         imports: [ 
    //         ],
    //         controllers: [ LectureController ],
    //         providers:[ LectureService ]
    //     })
    //     .overrideProvider(LectureService)
    //     .useValue('a')
    //     .compile();
    //     controller = moduleRef.get<LectureController>(LectureController);
    // })

    it('should return a lecture', () => {
        controller = new LectureController(service());
        expect(controller).toBeDefined();
    })

    // it('should be defined', async () => {
    //     let lecture = new Lecture();
    //     lecture.id = 1;
    //     const service = new (class extends LectureService {
    //         constructor(){
    //             super(null)
    //         }
            
    //         getById(id: number): Promise<Lecture> {
    //             return Promise.resolve(lecture);
    //         }
    //     })();
    //     console.log(controller.getById(1));
        
    //     controller = new LectureController(service);
    //     expect(controller).toBeDefined();
    // })
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