import { IsInt, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateLectureDTO {

    @MinLength( 4, { message: 'title is way too short.' } )
    title: string;

    @MinLength( 10, { message: 'description is way too short.' } )
    description: string;

    @IsOptional()
    thumbnail: string;

    @IsNotEmpty()
    @IsInt()
    price: number;

    static create(title: string|null) {
        const param = new CreateLectureDTO();
        param.title = title;
        param.description = "JS 스터디셀러라구요";
        param.thumbnail =  "https://nextstep-storage.s3.ap-northeast-2.amazonaws.com/af98e7e689b8411cb51aef899b8be1a2";
        param.price = 7777;
        return param;
    }
}

/**
 * read-only
 * IoC 컨테이너에 의해 자동으로 인스턴스가 생성될때 값이 할당되며
 * 이후에 임의로 값을 수정 할 수 없다.
 */