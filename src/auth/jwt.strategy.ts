import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'test',
            ignoreExpiration: false,
            /**
             * extract jwt from cookie using UseGuards
             * cookie는 request에서 추출하는 것이고
             * ExtractJwt의 함수는 리퀘스트를 받아서 처리해주고 jwt를 반환해주는 역할.
             * jwtFromRequest는 리퀘스트를 인자로 넣어주나보다.
             */ 
            jwtFromRequest: cookieExtractor,
        })
    }

    /**
     * 
     * @param payload 
     * @returns 
     * this class named isAuth used to add token and username to the request and return it.
     * this nestjs validator is called by useGuards()
     * this add information to the request that this received and return it as a middleware
     * 
     * how to extract values in request?
     * use createParameterDecorator
     * 
     */
    async validate(payload: any) {
        return payload;
    }
}
var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['token'] || req.header;
    }
    return token;
};

