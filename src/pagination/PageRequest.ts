import { IsNumber, IsOptional } from "class-validator";

export abstract class PageRequest {

    @IsOptional()
    pageNo: number = 1; // (1)

    @IsNumber()
    pageSize: number = 10;
    
    getOffset(): number {
        return (this.pageNo-1) * this.pageSize;
    }

    getLimit(): number {
        return this.pageSize;
    }

    getLimitWithNext(): number {
        return this.pageSize + 1;
    }
}

/**
 * QueryString에 맵핑된다.
 * - req.query.pageNo
 * 
 * (1): 기본 값을 지정한다.
 * 내가 직접 인스턴스를 생성하는게 아니기때문에 constructor도 없고
 * 어떻게 해당 변수에 대한 기본값을 지정해야할지 헷갈렸다.
 */