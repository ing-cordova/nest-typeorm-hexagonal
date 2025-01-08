import { Module } from '@nestjs/common';
import { CreateIssuerTypeUseCase } from '../application/create-issuer-type-use-case/create-issuer-type-use-case';
import { UpdateIssuerTypeUseCase } from '../application/update-issuer-type-use-case/update-issuer-type-use-case';
import { DeleteIssuerTypeUseCase } from '../application/delete-issuer-type-use-case/delete-issuer-type-use-case';
import { FindAllIssuerTypeUseCase } from '../application/find-all-issuer-type-use-case/find-all-issuer-type-use-case';
import { FindOneIssuerTypeUseCase } from '../application/find-one-issuer-type-use-case/find-one-issuer-type-use-case';
import { TypeOrmIssuerTypeRepository } from './repositories/typeorm-issuer-type.repository';
import { IssuerType } from '../domain/issuer-type.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/context/services/jwt/jwt.strategy';
import { PermissionModule } from '../../permission/infraestructure/permission.module';
import { CreateIssuerTypeController } from './http-api/create-issuer-type-controller/create-issuer-type-controller';
import { UpdateIssuerTypeController } from './http-api/update-issuer-type-controller/update-issuer-type-controller';
import { DeleteIssuerTypeByIdController } from './http-api/delete-issuer-type-by-id-controller/delete-issuer-type-by-id-controller';
import { FindAllIssuerTypeController } from './http-api/find-all-issuer-type-controller/find-all-issuer-type-controller';
import { FindOneIssuerTypeByIdController } from './http-api/find-one-issuer-type-by-id-controller/find-one-issuer-type-by-id-controller';
import { IssuerTypeRepository } from '../domain/issuer-type.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

const config = new ConfigService();

@Module({
    imports: [
        TypeOrmModule.forFeature([IssuerType]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        }),
        PermissionModule
    ],
    controllers: [
        CreateIssuerTypeController,
        UpdateIssuerTypeController,
        DeleteIssuerTypeByIdController,
        FindAllIssuerTypeController,
        FindOneIssuerTypeByIdController,
    ],
    providers: [
        CreateIssuerTypeUseCase,
        UpdateIssuerTypeUseCase,
        DeleteIssuerTypeUseCase,
        FindAllIssuerTypeUseCase,
        FindOneIssuerTypeUseCase,
        TypeOrmIssuerTypeRepository,
        {
            provide: IssuerTypeRepository,
            useClass: TypeOrmIssuerTypeRepository,
        },
        JwtStrategy,
    ],
    exports: [
        CreateIssuerTypeUseCase,
        UpdateIssuerTypeUseCase,
        DeleteIssuerTypeUseCase,
        FindAllIssuerTypeUseCase,
        FindOneIssuerTypeUseCase,
    ],
})
export class IssuerTypeModule {}