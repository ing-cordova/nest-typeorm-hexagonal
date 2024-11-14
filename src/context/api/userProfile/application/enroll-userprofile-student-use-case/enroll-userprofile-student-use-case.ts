import { Injectable } from '../../../../shared/dependency-injection/injectable';
import { UserTypeEnum } from '../../../userType/domain/user-type.enum';
import { encryptPassword } from '../../../../services/password-service';
import { HttpException } from '@nestjs/common';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { EnrollUserProfileStudentUseCaseDto } from './enroll-userprofile-student-use-case.dto';
import { UserProfile } from '../../domain/userprofile.model';

@Injectable()
export class EnrollUserProfileStudentUseCase {
    constructor(private readonly userProfileRepository: UserProfileRepository) { }

    async execute(
        dto: EnrollUserProfileStudentUseCaseDto,
    ): Promise<{ userProfile: UserProfile }> {

        if (!dto.accepted_terms) {
            throw new HttpException('You must accept the terms and conditions', 400);
        }

        try {
            const userProfile = new UserProfile();
            const passwordGenerated = this.generatePassword(8);

            userProfile.user_type_id = UserTypeEnum.STUDENT;
            userProfile.first_name = dto.first_name;
            userProfile.last_name = dto.last_name;
            userProfile.phone_number = dto.phone_number;
            userProfile.email = dto.email;

            userProfile.username = dto.username;
            userProfile.country_id = dto.country_id;
            userProfile.state_id = dto.state_id;
            userProfile.password = encryptPassword(passwordGenerated);
            userProfile.accepted_terms = dto.accepted_terms;
            userProfile.created_at = new Date();

            await this.userProfileRepository.create(userProfile);
            // TODO: Send email with the credentials.
            console.log(`Dear ${userProfile.first_name} ${userProfile.last_name}, your credentials are the following:\nEmail: ${userProfile.email}\nPassword: [${passwordGenerated}]`);

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
