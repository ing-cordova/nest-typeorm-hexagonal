import * as bycript from 'bcrypt';
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { UpdateUserProfileUseCaseParamsDto } from './update-userprofile-use-case-params.dto';
import { UpdateUserProfileUseCaseDto } from './update-userprofile-use-case.dto';
import { UserProfile } from '../../domain/userprofile.model';
import { UserProfileCannotUpdateException } from '../../domain/userprofile-cannot-update-exception';


@Injectable()
export class UpdateUserProfileUseCase {
    constructor(private readonly userProfileRepository: UserProfileRepository) { }

    async execute(params: UpdateUserProfileUseCaseParamsDto, reqBody: UpdateUserProfileUseCaseDto): Promise<{ userProfile: UserProfile }> {
        try {
            const userProfile = await this.userProfileRepository.updateById(params.id, reqBody);
            return { userProfile };
        }
        catch (error) {
            throw new UserProfileCannotUpdateException(params.id);
        }
    }
}