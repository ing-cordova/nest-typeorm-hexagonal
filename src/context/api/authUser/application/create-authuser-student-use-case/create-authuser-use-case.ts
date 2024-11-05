import { Injectable } from './../../../../shared/dependency-injection/injectable';
import { AuthUser } from '../../domain/authuser.model';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { UserTypeEnum } from 'src/context/api/userType/domain/user-type.enum';
import { CreateAuthUserStudentUseCaseDto } from './create-authuser-use-case.dto';
import { encryptPassword } from 'src/context/services/password-service';
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
            console.log('> Temporal password generated: ', passwordGenerated);

            return { authUser };
        }
        catch (error) {
            throw new HttpException('Error while creating user...', 500);
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
