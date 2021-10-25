import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { JwtDTO } from "./dto/jwt.dto";

let token;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        /**
         * ExtractJwt의 함수는 리퀘스트를 받아서 jwt를 추출하고 반환한다.
         * jwtFromRequest는 리퀘스트를 인자로 넣어주나보다.
         */ 
        super({
            secretOrKey: 'test',
            ignoreExpiration: false,
            jwtFromRequest: cookieExtractor,
        })
    }

    /**
     * @param payload
     * @returns `JwtDTO`
     * 
     * super() 함수는 토큰 유효성 검사 통과하면 토큰에 들어있는 데이터를 반환
     * validate는 데이터를 받아서 user객체에 담아 request에 추가한다. (createParameterDecorator 참고)
     */
    async validate(payload: any): Promise<JwtDTO> {
        
        if(!await this.checkUserId(payload.id)) {
            throw new Error(`You are not a registered member.`);
        }

        return {
            token,
            id: payload.id,
            name: payload.name
        };
    }

    async checkUserId(id) {
        return await this.userRepository.findById(id);
    }

}
const cookieExtractor = function(req) {
    let result = null;
    if (req && req.cookies) {
        result = req.cookies['token'] || req.header;
        token = result
    }
    return result;
};

