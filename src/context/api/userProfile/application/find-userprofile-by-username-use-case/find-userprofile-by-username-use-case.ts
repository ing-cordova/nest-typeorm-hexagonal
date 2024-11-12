import { UserProfileNotFoundException } from '../../domain/userprofile-not-found.exception';
import { UserProfile } from '../../domain/userprofile.model';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { Injectable } from '../../../../shared/dependency-injection/injectable';
import { FindUserProfileByUsernameUseCaseDto } from './find-userprofile-by-username-use-case.dto';

@Injectable()
export class FindUserProfileByUsernameUseCase {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async execute(
    findByUsernameDto: FindUserProfileByUsernameUseCaseDto,
  ): Promise<{ userProfile: UserProfile }> {
    const userProfile = await this.userProfileRepository.findByUsername(
      findByUsernameDto.username,
    );

    if (!userProfile) {
      throw new UserProfileNotFoundException(findByUsernameDto.username);
    }

    return { userProfile };
  }
}
