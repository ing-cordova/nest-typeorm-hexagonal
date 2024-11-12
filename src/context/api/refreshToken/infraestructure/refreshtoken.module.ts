import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenController } from './http-api/refresh-token/refresh-token.controller';
import { JwtRefreshTokenStrategy } from 'src/context/services/jwt/jwt-refresh-token.strategy';
import { UserProfile } from '../../userProfile/domain/userprofile.model';
import { FindUserProfileByUsernameUseCase } from '../../userProfile/application/find-userprofile-by-username-use-case/find-userprofile-by-username-use-case';
import { TypeOrmUserProfileRepository } from '../../userProfile/infraestructure/repositories/typeorm-userprofile.repository';
import { UserProfileRepository } from '../../userProfile/domain/userprofile.repository';


const config = new ConfigService();
@Module({
    imports: [
        TypeOrmModule.forFeature([UserProfile]),
        JwtModule.register({
            secret: config.get<string>('REFRESH_TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('REFRESH_TOKEN_EXPIRATION') },
        })
    ],
    controllers: [
        RefreshTokenController
    ],
    providers: [
        FindUserProfileByUsernameUseCase,
        TypeOrmUserProfileRepository,
        {
          provide: UserProfileRepository,
          useClass: TypeOrmUserProfileRepository,
        },
        JwtRefreshTokenStrategy
    ],
    exports: [
        FindUserProfileByUsernameUseCase
    ],
})
export class RefreshTokenModule { }
