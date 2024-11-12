import { Injectable } from '../../../../shared/dependency-injection/injectable';
import { UserProfile } from '../../domain/userprofile.model';
import { UserProfileRepository } from '../../domain/userprofile.repository';

@Injectable()
export class GetAllUserProfileUseCase {
  constructor(private readonly userProfileRepository: UserProfileRepository) { }

  async execute(): Promise<{ userProfiles: UserProfile[] }> {
    const userProfiles = await this.userProfileRepository.findAll();
    return { userProfiles };
  }
}
