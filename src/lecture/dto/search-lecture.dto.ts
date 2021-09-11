import { Lecture } from "../lecture.entity";

export class SearchLectureDTO {
    title: string;
    author: string;
    price: number;

    constructor(entity: Lecture) {
        this.title = entity.title;
        this.author = entity.author;
        this.price = entity.price;
    }
}