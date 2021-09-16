import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Lecture } from 'src/lecture/lecture.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get all [GET /lecture]', () => {
    return request(app.getHttpServer())
      .get('/lecture')
      .then(lectures => {
        expect(lectures).toMatchObject(Promise.resolve([Lecture]))
      })
  });
});
