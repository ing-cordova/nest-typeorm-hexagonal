import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpException, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginUseCase } from "src/context/api/authUser/application/login-use-case/login-use-case";
import { LoginHttpDto } from "./login-http.dto";
import { generateAPPTokenAndRefreshToken } from "src/context/services/token-service";

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class LoginController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: LoginHttpDto) {
        const userFound = await this.loginUseCase.execute(body.email, body.password);
        if (!userFound) throw new HttpException("We're sorry, we can not find your account. :(", 404);
        return generateAPPTokenAndRefreshToken(userFound);
    }
}