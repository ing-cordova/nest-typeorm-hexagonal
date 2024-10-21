import * as bycript from 'bcrypt';
import { Injectable } from "./../../../../shared/dependency-injection/injectable";
import { AuthUserRepository } from "../../domain/authuser.repository";
import { UpdateAuthUserUseCaseDto } from "./update-authuser-use-case.dto";
import { AuthUser } from "../../domain/authuser.model";
import { AuthUserCannotUpdateException } from "../../domain/authuser-cannot-update-exception";
import { UpdateAuthUserUseCaseParamsDto } from './update-authuser-use-case-params.dto';


@Injectable()
export class UpdateAuthUserUseCase {
    constructor(private readonly authUserRepository: AuthUserRepository) { }

    async execute(params: UpdateAuthUserUseCaseParamsDto, reqBody: UpdateAuthUserUseCaseDto): Promise<{ authUser: AuthUser }> {
        try {
            const authUser = await this.authUserRepository.updateById(params.id, reqBody);
            return { authUser };
        }
        catch (error) {
            throw new AuthUserCannotUpdateException(params.id);
        }
    }
}