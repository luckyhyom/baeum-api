import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import * as faker from 'faker';
import { createTestApp } from "tests/app-set";
import { createUser, createUserInfo } from "../auth-utils";

describe('Auth Integration', () => {
    let app: INestApplication;
    let req: request.SuperTest<request.Test>;
    let csrf;

    beforeAll(async () => {
        app = await createTestApp();
        req = request(app.getHttpServer());

        let res = await req.get('/auth/csrf-token');

        csrf = {
            'csrf-token': res.body.csrfToken
        };
    });

    describe('CSRF 토큰', () => {
        it('없을 경우 에러 메시지 반환', async () => {
            const data = createUserInfo();

            const res = await req.post('/auth/signup')
                .send(data);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('Something went wrong.');
        });

        it('유효하지 않을 경우 에러 메시지 반환', async () => {
            const data = createUserInfo();

            const res = await req.post('/auth/signup')
                .set('csrf-token', faker.random.alphaNumeric(128))
                .send(data);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe('Something went wrong.');
        });
    });

    describe('POST to /auth/signup', () => {
        test.each([
            ['userId', [
                'userId must contain only letters and numbers',
                'userId should not be empty',
                'userId must be longer than or equal to 8 characters'
            ]],
            ['password', [
                'password should not be empty',
                'password must be longer than or equal to 10 characters'
            ]],
            ['name', [
                'name should not be empty',
                'name must be longer than or equal to 2 characters'
            ]],
            ['about', [
                'about should not be empty',
                'about must be longer than or equal to 8 characters'
            ]],
            ['email', [
                'email should not be empty',
                'email must be an email',
                'email must be longer than or equal to 5 characters'
            ]],
        ])('%s 유효성 검사', async (key, messages) => {
            const data = createUserInfo();
            data[key] = '';
            const res = await req.post('/auth/signup')
                .set(csrf)
                .send(data);

            expect(res.status).toBe(HttpStatus.BAD_REQUEST);
            expect(res.body.message).toStrictEqual(messages);
        });

        it('이미 존재하는 아이디이면 409 반환', async () => {
            const data = createUserInfo();
            
            const first = await req.post('/auth/signup')
                .set(csrf)
                .send(data);
            const res = await req.post('/auth/signup')
                .set(csrf)
                .send(data);

            expect(res.status).toBe(HttpStatus.CONFLICT);
            expect(res.body.message).toBe('이미 존재하는 아이디입니다.')
        });

        it('가입 성공시 쿠키안에 토큰과 유저 정보 반환', async () => {
            const data = createUserInfo();
            
            const res = await req.post('/auth/signup')
                .set(csrf)
                .send(data);

            expect(res.status).toBe(HttpStatus.CREATED);
            expect(res.headers['set-cookie'][0]).toMatch(res.body.token);
            expect(res.body).toStrictEqual({
                id: res.body.id,
                token: res.body.token,
                name: res.body.name,
                about: res.body.about,
                email: res.body.email,
                profileImageURL: res.body.profileImageURL
            });
        });
    });

    describe('POST to /auth/login', () => {
        it('로그인 정보가 유요하지 않은 경우 404 반환', async () => {
            const userId = faker.random.alphaNumeric(20);
            const password = faker.random.alphaNumeric(20);

            const res = await req.post('/auth/login')
                .set(csrf)
                .send({ userId, password });

            expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
            expect(res.body.message).toBe('ID or Password is Wrong.');
        });

        it('쿠키에 토큰 저장 후 유저 정보 반환', async () => {
            const user = await createUser(req, csrf);

            const res = await req.post('/auth/login')
                .set(csrf)
                .send({
                    userId: user.userId,
                    password: user.password
                });
                
            expect(res.status).toBe(HttpStatus.CREATED);
            expect(res.headers['set-cookie'][0]).toMatch(user.token);
            expect(res.body).toStrictEqual({
                id: res.body.id,
                token: res.body.token,
                name: res.body.name,
                about: res.body.about,
                email: res.body.email,
                profileImageURL: res.body.profileImageURL
            });
        });
    });
});

