import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import cookieParser from "cookie-parser";
import { AppModule } from "src/app.module";
import { CSRFGuard } from "src/auth/csrf.guard";
import { SQLiteConfig } from "src/configs/typeorm.config";

export async function createTestApp() {
    let app: INestApplication;
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            AppModule,
            TypeOrmModule.forRoot(SQLiteConfig)
        ],
    }).compile();
    app = moduleFixture.createNestApplication();
    
    app.useGlobalGuards(new CSRFGuard());
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));

    await app.init();
    return app;
}