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
        userProfile.first_name = dto.first_name;
        userProfile.last_name = dto.last_name;
        userProfile.username = dto.username;
        userProfile.email = dto.email;
        userProfile.password = encryptPassword(dto.password);
        userProfile.country_id = dto.country_id;
        userProfile.user_type_id = dto.user_type_id;
        userProfile.created_at = new Date();
    
        await this.userProfileRepository.create(userProfile);
    
        return { userProfile };
  }
}
