import { Injectable } from 'src/context/shared/dependency-injection/injectable';
import { AuthUser, PrimitiveAuthUser } from '../../domain/authuser.model';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { CreateAuthUserUseCaseDto } from './create-authuser-use-case.dto';

@Injectable()
export class CreateAuthUserUseCase {
  constructor(private readonly authUserRepository: AuthUserRepository) {}

  async execute(
    dto: CreateAuthUserUseCaseDto,
  ): Promise<{ authUser: PrimitiveAuthUser }> {
    const authUser = AuthUser.create(dto);
    await this.authUserRepository.create(authUser);
    return { authUser: authUser.toValue() };
  }
}
