import { Body, Controller, Delete, Get, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtDTO } from './dto/jwt.dto';
import { LoginResponse } from './dto/login-response.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginDTO } from './dto/user.dto';
import { ParamUser } from './user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() createUserDTO: CreateUserDTO, @Res({passthrough: true}) res: Response) {
        return this.authService.signup(createUserDTO, res);
    }

    @Post('login')
    login(@Body() loginDTO: LoginDTO, @Res({passthrough: true}) res: Response): Promise<LoginResponse> {
        return this.authService.login(loginDTO, res);
    }

    @Patch()
    updateUser(@Body() updateUserDTO: UpdateUserDTO) {
        this.authService.updateUser(updateUserDTO);
    }

    @Post('logout')
    logout(@Res({passthrough: true})res: Response) {
        res.clearCookie('token')
        return { message: 'logged out' };
    }

    @Delete()
    deleteUser(@Body() loginDTO: LoginDTO) {
        this.authService.deleteUser(loginDTO);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async me(@ParamUser() user: JwtDTO): Promise<LoginResponse> {
        return this.authService.me(user);
    }

    @Get('csrf-token')
    async getCSRFToken() {
        const csrfToken = await this.authService.createCSRFToken()
        return { csrfToken };
    }
}