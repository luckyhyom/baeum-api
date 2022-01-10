import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
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
    await app.init();

    return app;
}