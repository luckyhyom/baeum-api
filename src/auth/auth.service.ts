import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';

const salt = 10;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signup(createUserDTO: CreateUserDTO) {
        
        if (this.userRepository.findByUserId(createUserDTO.userId)) {
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

    async login(loginDTO: LoginDTO, res: Response) {
        // 아이디 유무 확인
        const { userId, password } = await this.userRepository.findByUserId(loginDTO.userId)
        
        if (!userId) {
            throw new Error("no user");
        }

        // 패스워드 검증
        let accessToken;
        if (await bcrypt.compare(loginDTO.password, password)) {
            accessToken = this.jwtService.sign({
                userId
            })
            this.setToken(accessToken, res);
            return { accessToken };
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

    async me() {
        // 요청에 포함된 jwt를 검사하는 역할
        // 2개가 있던걸로 기억하는데.
    }

    async hashValue(password: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    setToken(accessToken: string, res: Response) {
        // brower should have credentials: 'include' option.
        const options: CookieOptions = {
            maxAge: 60 * 60 * 2 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        };
        res.cookie('token', accessToken, options)
    }
}