import { Module } from '@nestjs/common';
import { CreateAuthUserController } from './http-api/create-authuser/create-authuser.controller';
import { CreateAuthUserUseCase } from '../application/create-authuser-use-case/create-authuser-use-case';
import { AuthUserRepository } from '../domain/authuser.repository';
import { FindAuthuserByUsernameController } from './http-api/find-authuser-by-username/find-authuser-by-username.controller';
import { FindAuthUserByUsernameUseCase } from '../application/find-authuser-by-username-use-case/find-authuser-by-username-use-case';
import { GetAllAuthuserController } from './http-api/get-all-authuser/get-all-authuser.controller';
import { GetAllAuthUserUseCase } from '../application/get-all-authuser-use-case/get-all-authuser-use-case';
import { TypeOrmAuthUserRepository } from './repositories/typeorm-authuser.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from '../domain/authuser.model';
import { DeleteAuthUserByIdController } from './http-api/delete-authuser-by-id/delete-by-id.controller';
import { DeleteAuthUserByIdUseCase } from '../application/delete-authuser-by-id-use-case/delete-authuser-by-id-use-case';
import { UpdateAuthuserController } from './http-api/update-authuser/update-authuser.controller';
import { UpdateAuthUserUseCase } from '../application/update-authuser-use-case/update-authuser-use-case';
import { LoginController } from './http-api/login/login.controller';
import { LoginUseCase } from '../application/login-use-case/login-use-case';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../../services/jwt/jwt.strategy';
import { CreateAuthUserStudentController } from './http-api/enroll-authuser-student/enroll-authuser-student.controller';
import { EnrollAuthUserStudentUseCase } from '../application/enroll-authuser-student-use-case/enroll-authuser-student-use-case';
import { ChangeTemporalPasswordController } from './http-api/change-temporal-password/change-temporal-password.controller';
import { ChangeTemporalPasswordUseCase } from '../application/change-temporal-password-use-case/change-temporal-password-use-case';

const config = new ConfigService();
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthUser]), 
    JwtModule.register({
      secret: config.get<string>('TOKEN_SECRET'),
      signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
    })
  ],
  controllers: [
    CreateAuthUserController,
    CreateAuthUserStudentController,
    FindAuthuserByUsernameController,
    GetAllAuthuserController,
    DeleteAuthUserByIdController,
    UpdateAuthuserController,
    ChangeTemporalPasswordController,
    LoginController
  ],
  providers: [
    CreateAuthUserUseCase,
    EnrollAuthUserStudentUseCase,
    FindAuthUserByUsernameUseCase,
    GetAllAuthUserUseCase,
    DeleteAuthUserByIdUseCase,
    UpdateAuthUserUseCase,
    LoginUseCase,
    ChangeTemporalPasswordUseCase,
    TypeOrmAuthUserRepository,
    {
      provide: AuthUserRepository,
      useClass: TypeOrmAuthUserRepository,
    },
    JwtStrategy
  ],
  exports: [
    CreateAuthUserUseCase,
    EnrollAuthUserStudentUseCase,
    FindAuthUserByUsernameUseCase,
    GetAllAuthUserUseCase,
    DeleteAuthUserByIdUseCase,
    UpdateAuthUserUseCase,
    LoginUseCase,
    ChangeTemporalPasswordUseCase,
  ],
})
export class AuthUserModule {}
