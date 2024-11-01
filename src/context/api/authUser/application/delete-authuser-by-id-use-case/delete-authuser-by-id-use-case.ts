import { AuthUserRepository } from '../../domain/authuser.repository';
import { Injectable } from '../../../../shared/dependency-injection/injectable';
import { DeleteAuthUserByIdUseCaseDto } from './delete-authuser-use-by-id-case.dto';

@Injectable()
export class DeleteAuthUserByIdUseCase {
    constructor(private readonly authUserRepository: AuthUserRepository) {}

    execute(dto: DeleteAuthUserByIdUseCaseDto): Promise<void> {
        return this.authUserRepository.deleteById(dto.id);
    }
}