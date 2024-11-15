import { UserProfileRepository } from '../../domain/userprofile.repository';
import { Injectable } from '../../../../shared/dependency-injection/injectable';
import { DeleteUserProfileByIdUseCaseDto } from './delete-userprofile-use-by-id-case.dto';

@Injectable()
export class DeleteUserProfileByIdUseCase {
    constructor(private readonly userProfileRepository: UserProfileRepository) {}

    execute(dto: DeleteUserProfileByIdUseCaseDto): Promise<void> {
        return this.userProfileRepository.deleteById(dto.id);
    }
}