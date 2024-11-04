import { Body, Controller, HttpCode, HttpException, Post, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginUseCase } from "src/context/api/authUser/application/login-use-case/login-use-case";
import { LoginHttpDto } from "./login-http.dto";
import { generateAppToken } from "src/context/services/token-service";
import { encryptPassword } from "src/context/services/password-service";

@ApiTags('authuser')
@Controller('authuser')
export class LoginController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: LoginHttpDto) {
        const userFound = await this.loginUseCase.execute(body.email, body.password);
        if (!userFound) throw new HttpException("We're sorry, we can not find your account. :(", 404);
        return { token: generateAppToken(userFound) };
    }
}