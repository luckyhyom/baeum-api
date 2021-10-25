import { IsInt, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateLectureDto {

    @MinLength( 4, { message: 'title is way too short.' } )
    readonly title: string;

    @MinLength( 10, { message: 'description is way too short.' } )
    readonly description: string;

    @IsOptional()
    readonly thumbnail: string;

    @IsNotEmpty()
    @IsInt()
    readonly price: number;
}

/**
 * read-only
 * IoC 컨테이너에 의해 자동으로 인스턴스가 생성될때 값이 할당되며
 * 이후에 임의로 값을 수정 할 수 없다.
 */