import { Injectable } from '../../../../shared/dependency-injection/injectable';
import { encryptPassword } from '../../../../services/password-service';
import { HttpException } from '@nestjs/common';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { UserProfile } from '../../domain/userprofile.model';
import { GenerateUserProfileUseCaseDto } from './generate-userprofile-use-case.dto';
import { userTypeReverseMap } from '../../../userType/domain/user-type.enum';
import { Logger } from '@nestjs/common';

@Injectable()
export class GenerateUserProfileUseCase {
    constructor(private readonly userProfileRepository: UserProfileRepository) { }

    private readonly logger = new Logger(GenerateUserProfileUseCase.name);
    async execute(
        dto: GenerateUserProfileUseCaseDto,
    ): Promise<{ userProfile: UserProfile }> {

        try {
            const userProfile = new UserProfile();
            const passwordGenerated = this.generatePassword(8);

            userProfile.user_type_id = dto.user_type_id;
            userProfile.first_name = dto.first_name;
            userProfile.last_name = dto.last_name;
            userProfile.phone_number = dto.phone_number;
            userProfile.email = dto.email;

            userProfile.username = dto.username;
            userProfile.country_id = dto.country_id;
            userProfile.state_id = dto.state_id;
            userProfile.password = encryptPassword(passwordGenerated);
            userProfile.created_at = new Date();

            await this.userProfileRepository.create(userProfile);
            // TODO: Send email with the credentials.
            this.logger.verbose(`\nWelcome ${userTypeReverseMap[dto.user_type_id]}\nDear ${userProfile.first_name} ${userProfile.last_name}, your credentials are the following:\nEmail: ${userProfile.email}\nPassword: [${passwordGenerated}]`);

            return { userProfile };
        }
        catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    public generatePassword = (length = 10): string => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };
}
