import { Module } from '@nestjs/common';
import { CreateAuthUserController } from './http-api/create-authuser/create-authuser.controller';
import { CreateAuthUserUseCase } from '../application/create-authuser-use-case/create-authuser-use-case';
import { InMemoryAuthUserRepository } from './repositories/in-memory.authuser-respository';
import { AuthUserRepository } from '../domain/authuser.repository';
import { FindAuthuserByUsernameController } from './http-api/find-authuser-by-username/find-authuser-by-username.controller';
import { FindAuthUserByUsernameUseCase } from '../application/find-authuser-by-username-use-case/find-authuser-by-username-use-case';
import { GetAllAuthuserController } from './http-api/get-all-authuser/get-all-authuser.controller';
import { GetAllAuthUserUseCase } from '../application/get-all-authuser-use-case/get-all-authuser-use-case';

@Module({
  controllers: [
    CreateAuthUserController,
    FindAuthuserByUsernameController,
    GetAllAuthuserController,
  ],
  providers: [
    CreateAuthUserUseCase,
    FindAuthUserByUsernameUseCase,
    GetAllAuthUserUseCase,
    InMemoryAuthUserRepository,
    {
      provide: AuthUserRepository,
      useExisting: InMemoryAuthUserRepository,
    },
  ],
  exports: [
    CreateAuthUserUseCase,
    FindAuthUserByUsernameUseCase,
    GetAllAuthUserUseCase,
  ],
})
export class AuthUserModule {}
