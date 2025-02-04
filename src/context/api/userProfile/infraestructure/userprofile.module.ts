import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './http-api/login/login.controller';
import { LoginUseCase } from '../application/login-use-case/login-use-case';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../../services/jwt/jwt.strategy';
import { ChangeTemporalPasswordController } from './http-api/change-temporal-password/change-temporal-password.controller';
import { ChangeTemporalPasswordUseCase } from '../application/change-temporal-password-use-case/change-temporal-password-use-case';
import { UserProfile } from '../domain/userprofile.model';
import { CreateUserProfileUseCase } from '../application/create-userprofile-use-case/create-userprofile-use-case';
import { UserProfileRepository } from '../domain/userprofile.repository';
import { DeleteUserProfileByIdUseCase } from '../application/delete-userprofile-by-id-use-case/delete-userprofile-by-id-use-case';
import { FindUserProfileByUsernameUseCase } from '../application/find-userprofile-by-username-use-case/find-userprofile-by-username-use-case';
import { GetAllUserProfileUseCase } from '../application/get-all-userprofile-use-case/get-all-userprofile-use-case';
import { UpdateUserProfileUseCase } from '../application/update-userprofile-use-case/update-userprofile-use-case';
import { TypeOrmUserProfileRepository } from './repositories/typeorm-userprofile.repository';
import { CreateUserProfileController } from './http-api/create-userprofile/create-userprofile.controller';
import { DeleteUserProfileByIdController } from './http-api/delete-userprofile-by-id/delete-by-id.controller';
import { GetAllUserProfileqController } from './http-api/get-all-userprofiles/get-all-userprofile.controller';
import { UpdateUserProfileController } from './http-api/update-userprofile/update-userprofile.controller';
import { PermissionModule } from '../../permission/infraestructure/permission.module';
import { FindUserProfileByUsernameController } from './http-api/find-userprofile-by-username/find-userprofile-by-username.controller';
import { GenerateUserProfileController } from './http-api/generate-userprofile/enroll-userprofile-student.controller';
import { GenerateUserProfileUseCase } from '../application/generate-userprofile-use-case/generate-userprofile-use-case';
import { PaginationService } from 'src/context/services/pagination/pagination.service';

const config = new ConfigService();
@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile]),
    JwtModule.register({
      secret: config.get<string>('TOKEN_SECRET'),
      signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
    }),
    PermissionModule
  ],
  controllers: [
    CreateUserProfileController,
    GenerateUserProfileController,
    FindUserProfileByUsernameController,
    GetAllUserProfileqController,
    DeleteUserProfileByIdController,
    UpdateUserProfileController,
    ChangeTemporalPasswordController,
    LoginController
  ],
  providers: [
    CreateUserProfileUseCase,
    GenerateUserProfileUseCase,
    FindUserProfileByUsernameUseCase,
    GetAllUserProfileUseCase,
    DeleteUserProfileByIdUseCase,
    UpdateUserProfileUseCase,
    LoginUseCase,
    ChangeTemporalPasswordUseCase,
    TypeOrmUserProfileRepository,
    {
      provide: UserProfileRepository,
      useClass: TypeOrmUserProfileRepository,
    },
    JwtStrategy,
    PaginationService
  ],
  exports: [
    CreateUserProfileUseCase,
    GenerateUserProfileUseCase,
    FindUserProfileByUsernameUseCase,
    GetAllUserProfileUseCase,
    DeleteUserProfileByIdUseCase,
    UpdateUserProfileUseCase,
    LoginUseCase,
    ChangeTemporalPasswordUseCase,
  ],
})
export class UserProfileModule { }
