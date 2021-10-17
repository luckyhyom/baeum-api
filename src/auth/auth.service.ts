import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import config from 'src/configs/config';
import { LoginResponse } from './dto/login-response.dto';
import { JwtDTO } from './dto/jwt.dto';

const salt = 10;
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signup(createUserDTO: CreateUserDTO) {
        
        if (await this.userRepository.findByUserId(createUserDTO.userId)) {
            throw new Error("already exists");
        }

        try {
            this.userRepository.createUser({
                ...createUserDTO,
                password: await this.hashValue(createUserDTO.password)
            }); 
        } catch (error) {
            console.log(error);
        }
        return 'good'
    }

    async login(loginDTO: LoginDTO, res: Response): Promise<LoginResponse> {
        // 아이디 유무 확인
        const { userId, password } = loginDTO;
        const { id, name } = await this.userRepository.findByUserId(userId);
        if (!id) {
            throw new Error("no user");
        }
        
        const targetPassword = await this.userRepository.getPassword(userId);

        // 패스워드 검증
        let token;
        if (await bcrypt.compare(password, targetPassword)) {
            token = this.jwtService.sign({ id })
            this.setToken(token, res);
            return { token, name };
        }
    }

    updateUser(updateUserDTO: UpdateUserDTO) {
        // jwt 검증
        // 정보 변경
    }

    logout() {

    }

    deleteUser(deleteUserDTO: LoginDTO) {
        // 패스워드 검증
        // jwt 검증
        // 계정 삭제
        // this.delete()
    }

    async me(user: JwtDTO): Promise<LoginResponse> {
        return {
            name: (await this.userRepository.findById(user.id)).name,
            token: user.token
        }
    }

    async hashValue(password: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    setToken(token: string, res: Response) {
        // brower should have credentials: 'include' option.
        const options: CookieOptions = {
            maxAge: 60 * 60 * 2 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        };
        res.cookie('token', token, options)
    }

    async createCSRFToken() {
        return bcrypt.hash(config.csrf.password,1);
    }
}