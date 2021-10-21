import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { MulterExtendedModule } from 'nestjs-multer-extended';
import { config } from '../configs/config'

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([UserRepository]),
    MulterExtendedModule.register({
      awsConfig: {
        accessKeyId: config.aws.s3.access_key,
        secretAccessKey: config.aws.s3.secret_key,
        region: config.aws.s3.region,
      },
      bucket: config.aws.s3.name,
      basePath: 'baeumFiles',
      fileSize: 3 * 1024 * 1024, // 3MB
    }),
  ],
  controllers: [ AuthController ],
  providers: [ AuthService, JwtStrategy ],
  exports: [ JwtStrategy, PassportModule ]
})
export class AuthModule {}
