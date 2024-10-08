import { AuthUserRepository } from "../../domain/authuser.repository";
import { Injectable } from "./../../../shared/dependency-injection/injectable";

@Injectable()
export class LoginUseCase {
    constructor(private readonly authUserRepository: AuthUserRepository) {}

    async execute(username: string, password: string) {
        const authUser = await this.authUserRepository.login(username, password);
        return authUser;
    }
}