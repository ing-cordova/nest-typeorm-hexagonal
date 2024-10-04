import { Injectable } from './../../../shared/dependency-injection/injectable';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { AuthUserNotFoundException } from '../../domain/authuser-not-found.exception';
import { FindAuthUserByUsernameUseCaseDto } from './find-authuser-by-username-use-case.dto';
import { AuthUser } from '../../domain/authuser.model';

@Injectable()
export class FindAuthUserByUsernameUseCase {
  constructor(private readonly authUserRepository: AuthUserRepository) {}

  async execute(
    findByUsernameDto: FindAuthUserByUsernameUseCaseDto,
  ): Promise<{ authUser: AuthUser }> {
    const authUser = await this.authUserRepository.findByUsername(
      findByUsernameDto.username,
    );

    if (!authUser) {
      throw new AuthUserNotFoundException(findByUsernameDto.username);
    }

    return { authUser };
  }
}
