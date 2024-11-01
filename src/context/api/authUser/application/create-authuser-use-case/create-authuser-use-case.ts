import * as bycript from 'bcrypt';
import { Injectable } from './../../../../shared/dependency-injection/injectable';
import { AuthUser } from '../../domain/authuser.model';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { CreateAuthUserUseCaseDto } from './create-authuser-use-case.dto';
import { encryptPassword } from '../../../../services/password-service';

@Injectable()
export class CreateAuthUserUseCase {
  constructor(private readonly authUserRepository: AuthUserRepository) {}

  async execute(
    dto: CreateAuthUserUseCaseDto,
  ): Promise<{ authUser: AuthUser }> {
        const authUser = new AuthUser();
        authUser.username = dto.username;
        authUser.email = dto.email;
        authUser.password = encryptPassword(dto.password);
    
        await this.authUserRepository.create(authUser);
    
        return { authUser };
  }
}
