import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'
import { Observable } from "rxjs";
import config from "src/configs/config";

@Injectable()
export class CSRFGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.checkCRSFToken(request)
    }

    checkCRSFToken(request) {
        if (
            request.method === 'GET' ||
            request.method === 'OPTIONS' ||
            request.method === 'HEAD'
        ) { 
            return true;
        }
        return this.validateCRSFToken(request.headers['csrf_token']);
    }
    
    async validateCRSFToken(crsfToken: string): Promise<boolean> {
        return await bcrypt.compare(config.csrf.password, crsfToken);
    }
}