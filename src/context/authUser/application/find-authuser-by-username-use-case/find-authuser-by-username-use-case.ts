import { Injectable } from 'src/context/shared/dependency-injection/injectable';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { PrimitiveAuthUser } from '../../domain/authuser.model';
import { AuthUserNotFoundException } from '../../domain/authuser-not-found.exception';
import { FindAuthUserByUsernameUseCaseDto } from './find-authuser-by-username-use-case.dto';

@Injectable()
export class FindAuthUserByUsernameUseCase {
  constructor(private readonly authUserRepository: AuthUserRepository) {}

  async execute(
    findByUsernameDto: FindAuthUserByUsernameUseCaseDto,
  ): Promise<{ authUser: PrimitiveAuthUser }> {
    const authUser = await this.authUserRepository.findByUsername(
      findByUsernameDto.username,
    );

    if (!authUser) {
      throw new AuthUserNotFoundException(findByUsernameDto.username);
    }

    return { authUser: authUser.toValue() };
  }
}
