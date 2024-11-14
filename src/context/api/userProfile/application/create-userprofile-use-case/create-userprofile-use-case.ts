import * as bycript from 'bcrypt';
import { Injectable } from '../../../../shared/dependency-injection/injectable';
import { encryptPassword } from '../../../../services/password-service';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { UserProfile } from '../../domain/userprofile.model';
import { CreateUserProfileUseCaseDto } from './create-userprofile-use-case.dto';

@Injectable()
export class CreateUserProfileUseCase {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async execute(
    dto: CreateUserProfileUseCaseDto,
  ): Promise<{ userProfile: UserProfile }> {
        const userProfile = new UserProfile();
        userProfile.username = dto.username;
        userProfile.email = dto.email;
        userProfile.password = encryptPassword(dto.password);
    
        await this.userProfileRepository.create(userProfile);
    
        return { userProfile };
  }
}
