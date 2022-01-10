import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'
import { Observable } from "rxjs";
import config from "src/configs/config";

@Injectable()
export class CSRFGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.checkCSRFToken(request)
    }

    async checkCSRFToken(request) {
        if (
            request.method === 'GET' ||
            request.method === 'OPTIONS' ||
            request.method === 'HEAD'
        ) { 
            return true;
        };

        const csrfToken = await request.headers['csrf_token'];

        if (
            !csrfToken ||
            !await this.validateCSRFToken(csrfToken)
        ) {
            console.warn(`유효하지 않은 CSRF 토큰 입니다. (${csrfToken})`);
            throw new HttpException('Something went wrong.', HttpStatus.FORBIDDEN);
        };

        return true;
    }
    
    async validateCSRFToken(csrfToken: string): Promise<boolean> {
        return await bcrypt.compare(config.csrf.password, csrfToken);
    }
}