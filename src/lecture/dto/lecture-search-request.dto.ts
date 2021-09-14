import { IsOptional } from "class-validator";
import { PageRequest } from "../../pagination/PageRequest";

/**
 * URL의 쿼리스트링과 맵핑된다.
 * 쿼리스트링에 포함되어 있지 않을 경우 기본값을 설정 할 수 있다.
 */

export class LectureSearchRequest extends PageRequest {
    @IsOptional()
    title: string | null;

    constructor() {
        super();
    }

    static create(title: string|null, pageNo: number, pageSize: number) {
        const param = new LectureSearchRequest();
        param.title = title;
        param.pageNo = pageNo;
        param.pageSize = pageSize;
        return param;
    }

    /**
     * 객체의 상태를 직접 꺼내보는 것이 아닌, 메시지를 통해서 상태 확인
     * 그것을 위한 인터페이스를 구현
     * 
     * if(searchLectureRequest.title != null)
     * -> if(searchLectureRequest.hasTitle())
     */
    hasTitle() {
        return this.title != null;
    }
}