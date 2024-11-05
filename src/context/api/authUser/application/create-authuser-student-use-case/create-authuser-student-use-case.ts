import { Injectable } from '../../../../shared/dependency-injection/injectable';
import { AuthUser } from '../../domain/authuser.model';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { UserTypeEnum } from '../../../userType/domain/user-type.enum';
import { CreateAuthUserStudentUseCaseDto } from './create-authuser-student-use-case.dto';
import { encryptPassword } from '../../../../services/password-service';
import { HttpException } from '@nestjs/common';

@Injectable()
export class CreateAuthUserStudentUseCase {
    constructor(private readonly authUserRepository: AuthUserRepository) { }

    async execute(
        dto: CreateAuthUserStudentUseCaseDto,
    ): Promise<{ authUser: AuthUser }> {
        try {
            const authUser = new AuthUser();
            const passwordGenerated = this.generatePassword(8);

            authUser.user_type_id = UserTypeEnum.STUDENT;
            authUser.first_name = dto.first_name;
            authUser.last_name = dto.last_name;
            authUser.phone_number = dto.phone_number;
            authUser.email = dto.email;

            authUser.username = dto.username;
            authUser.country_id = dto.country_id;
            authUser.state_id = dto.state_id;
            authUser.password = encryptPassword(passwordGenerated);
            authUser.accepted_terms = dto.accepted_terms;
            authUser.created_at = new Date();

            await this.authUserRepository.create(authUser);
            // TODO: Send email with the credentials.
            console.log(`Dear ${authUser.first_name} ${authUser.last_name}, your credentials are the following:\nEmail: ${authUser.email}\nPassword: [${passwordGenerated}]`);

            return { authUser };
        }
        catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    private generatePassword = (length = 10): string => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}:"<>?|[];\'/`~';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };
}
