import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
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
            // validate if the request including BearerToken in it's Header
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    /**
     * 
     * @param payload 
     * @returns 
     * when i was learning from ellie, this class named isAuth used to add token and username to the request and return it.
     * and this nestjs validator is called by useGuards()
     * this also add information to the request that this received and return it as a middleware
     * 
     * so, how do I extract values in request?
     * use createParameterDecorator
     * 
     */
    async validate(payload: any) {
        console.log(payload);

        // return { token, userId }
        return payload;
    }
}