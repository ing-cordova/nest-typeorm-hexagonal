import { UserProfileRepository } from "../../domain/userprofile.repository";
import { Injectable } from "./../../../../shared/dependency-injection/injectable";

@Injectable()
export class LoginUseCase {
    constructor(private readonly userProfileRepository: UserProfileRepository) {}

    async execute(email: string, password: string) {
        const userProfile = await this.userProfileRepository.login(email, password);
        return userProfile;
    }
}