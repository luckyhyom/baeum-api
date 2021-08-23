export class CreateLectureDto {
    readonly title: string;
    readonly description: string;
    readonly videoURL: string;
    readonly author: string;
    readonly price: number;
    readonly status: Status;
}

type Status = 'PUBLIC' | 'PRIVATE';