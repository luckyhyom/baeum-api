import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  await app.listen(3000);
}
bootstrap();
