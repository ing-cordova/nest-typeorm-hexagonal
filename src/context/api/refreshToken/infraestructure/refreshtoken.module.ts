import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from '../../authUser/domain/authuser.model';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenController } from './http-api/refresh-token/refresh-token.controller';
import { JwtRefreshTokenStrategy } from 'src/context/services/jwt/jwt-refresh-token.strategy';
import { TypeOrmAuthUserRepository } from '../../authUser/infraestructure/repositories/typeorm-authuser.repository';
import { AuthUserRepository } from '../../authUser/domain/authuser.repository';
import { FindAuthUserByUsernameUseCase } from '../../authUser/application/find-authuser-by-username-use-case/find-authuser-by-username-use-case';


const config = new ConfigService();
@Module({
    imports: [
        TypeOrmModule.forFeature([AuthUser]),
        JwtModule.register({
            secret: config.get<string>('REFRESH_TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('REFRESH_TOKEN_EXPIRATION') },
        })
    ],
    controllers: [
        RefreshTokenController
    ],
    providers: [
        FindAuthUserByUsernameUseCase,
        TypeOrmAuthUserRepository,
        {
          provide: AuthUserRepository,
          useClass: TypeOrmAuthUserRepository,
        },
        JwtRefreshTokenStrategy
    ],
    exports: [
        FindAuthUserByUsernameUseCase
    ],
})
export class RefreshTokenModule { }
