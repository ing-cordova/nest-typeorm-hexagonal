import * as bycript from 'bcrypt';
import { Injectable } from './../../../shared/dependency-injection/injectable';
import { AuthUser } from '../../domain/authuser.model';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { CreateAuthUserUseCaseDto } from './create-authuser-use-case.dto';

@Injectable()
export class CreateAuthUserUseCase {
  constructor(private readonly authUserRepository: AuthUserRepository) {}

  async execute(
    dto: CreateAuthUserUseCaseDto,
  ): Promise<{ authUser: AuthUser }> {
        const hashPassword = await bycript.hash(dto.password, 10);

        const authUser = new AuthUser();
        authUser.username = dto.username;
        authUser.email = dto.email;
        authUser.password = hashPassword;
    
        await this.authUserRepository.create(authUser);
    
        return { authUser };
  }
}
