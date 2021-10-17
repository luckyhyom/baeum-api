import { Body, Controller, Delete, Get, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginResponse } from './dto/login-response.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() createUserDTO: CreateUserDTO) {
        this.authService.signup(createUserDTO);
    }

    @Post('login')
    login(@Body() loginDTO: LoginDTO, @Res({passthrough: true}) res: Response): Promise<LoginResponse> {
        return this.authService.login(loginDTO, res);
    }

    @Patch()
    updateUser(@Body() updateUserDTO: UpdateUserDTO) {
        this.authService.updateUser(updateUserDTO);
    }

    @Post()
    logout() {
        this.authService.logout();
    }

    @Delete()
    deleteUser(@Body() loginDTO: LoginDTO) {
        this.authService.deleteUser(loginDTO);
    }

    @Get('csrf-token')
    async getCSRFToken() {
        const csrfToken = await this.authService.createCSRFToken()
        return { csrfToken };
    }
}