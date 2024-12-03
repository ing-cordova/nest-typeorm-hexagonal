import * as bycript from 'bcrypt';
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { UserProfile } from '../../domain/userprofile.model';
import { UserProfileCannotUpdateException } from '../../domain/userprofile-cannot-update-exception';
import { UpdateUserProfileUseCaseDto } from './update-userprofile-use-case.dto';

@Injectable()
export class UpdateUserProfileUseCase {
    constructor(private readonly userProfileRepository: UserProfileRepository) { }

    async execute(username: string, reqBody: UpdateUserProfileUseCaseDto): Promise<{ userProfile: UserProfile }> {
        try {
            const { id } = await this.userProfileRepository.findByUsername(username);
            const { user_type_id, ...rest } = reqBody;
            const userProfile = await this.userProfileRepository.updateById(id, rest);
            return { userProfile };
        }
        catch (error) {
            throw new UserProfileCannotUpdateException(reqBody.id);
        }
    }
}   