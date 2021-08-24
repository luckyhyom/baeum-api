import { IsInt, IsNotEmpty, IsOptional, Length, MinLength, Validate, Validator } from "class-validator";
import { LectureStatus } from "../validator/status-validation";

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
    @Validate(LectureStatus, {
        message: 'something went wrong.'
    })
    readonly status: Status;
}

type Status = 'PUBLIC' | 'PRIVATE';