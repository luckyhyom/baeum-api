import { Lecture } from "../lecture.entity";

export class LectureSearchResponse {
    id: number;
    title: string;
    author: string;
    price: number;
    videoURL: string;
    description: string;
    userId: number;

    constructor(entity: Lecture) {
        this.id = entity.id;
        this.title = entity.title;
        this.author = entity.author;
        this.price = entity.price;
        this.videoURL = entity.videoURL;
        this.description = entity.description;
        this.userId = entity.userId;
    }
}

/**
 * DB데이터를 Pure하게 보내주는 것이 아닌, 적절하게 가공하여 보내주기 위함 Response DTO.
 */