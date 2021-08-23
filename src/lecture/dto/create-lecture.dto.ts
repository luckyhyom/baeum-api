import { IsInt, IsNotEmpty, IsOptional, Length, MinLength } from "class-validator";

export class CreateLectureDto {

    @MinLength( 4, { message: 'title is way too short.' } )
    readonly title: string;

    @MinLength( 10, { message: 'description is way too short.' } )
    readonly description: string;

    @IsOptional()
    readonly videoURL: string;

    @IsNotEmpty()
    readonly author: string;

    @IsNotEmpty()
    @IsInt()
    readonly price: number;

    @IsNotEmpty()
    readonly status: Status;
}

type Status = 'PUBLIC' | 'PRIVATE';