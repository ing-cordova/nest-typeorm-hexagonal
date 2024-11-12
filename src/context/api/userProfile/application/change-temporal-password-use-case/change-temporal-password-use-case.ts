import { HttpException, Injectable } from "@nestjs/common";
import { UserProfileRepository } from "../../domain/userprofile.repository";
import { ChangeTemporalPasswordUseCaseDto } from "./change-temporal-password-use-case.dto";

@Injectable()
export class ChangeTemporalPasswordUseCase {
    constructor(private readonly userProfileRepository: UserProfileRepository) { }

    async execute(
        dto: ChangeTemporalPasswordUseCaseDto
    ) {
        try {
            await this.userProfileRepository.changePassword(dto.username, dto.password);
        }
        catch (error) {
            throw new HttpException(error.message, 400);
        }
    }
}