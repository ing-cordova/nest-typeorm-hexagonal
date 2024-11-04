import { AuthUserRepository } from "../../domain/authuser.repository";
import { Injectable } from "./../../../../shared/dependency-injection/injectable";

@Injectable()
export class LoginUseCase {
    constructor(private readonly authUserRepository: AuthUserRepository) {}

    async execute(email: string, password: string) {
        const authUser = await this.authUserRepository.login(email, password);
        return authUser;
    }
}