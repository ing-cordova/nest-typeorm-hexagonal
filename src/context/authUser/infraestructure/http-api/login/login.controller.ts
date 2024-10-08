import { Body, Controller, HttpCode, HttpException, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginUseCase } from "src/context/authUser/application/login-use-case/login-use-case";
import { LoginHttpDto } from "./login-http.dto";
import { generateAppToken } from "src/context/services/token-service";

@ApiTags('authuser')
@Controller('authuser')
export class LoginController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: LoginHttpDto) {
        const userFound = await this.loginUseCase.execute(body.username, body.password);
        if (!userFound) throw new HttpException('User not found', 404);
        return { token: generateAppToken(userFound) };
    }
}