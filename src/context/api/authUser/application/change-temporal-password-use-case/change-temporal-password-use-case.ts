import { HttpException, Injectable } from "@nestjs/common";
import { AuthUserRepository } from "../../domain/authuser.repository";
import { ChangeTemporalPasswordUseCaseDto } from "./change-temporal-password-use-case.dto";

@Injectable()
export class ChangeTemporalPasswordUseCase {
    constructor(private readonly authUserRepository: AuthUserRepository) { }

    async execute(
        dto: ChangeTemporalPasswordUseCaseDto
    ) {
        try {
            await this.authUserRepository.changePassword(dto.username, dto.password);
        }
        catch (error) {
            throw new HttpException(error.message, 400);
        }
    }
}