import { ClassSerializerInterceptor, Controller, HttpException, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetInformationByToken } from 'src/context/services/get-information.decorator';
import { JwtAuthGuard } from 'src/context/services/jwt/jwt.guard';
import { generateAPPTokenAndRefreshToken } from 'src/context/services/token-service';
import { FindAuthUserByUsernameUseCase } from 'src/context/api/authUser/application/find-authuser-by-username-use-case/find-authuser-by-username-use-case';

@ApiTags('authuser')
@Controller('authuser')
@UseInterceptors(ClassSerializerInterceptor)
export class RefreshTokenController {
    constructor(private readonly findAuthuserByUsernameUseCase: FindAuthUserByUsernameUseCase,) { }

    @Post('/refresh-token')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Refresh token created successfully',
    })
    async run(@GetInformationByToken() gibt: any) {
        try {
            const result = await this.findAuthuserByUsernameUseCase.execute({ username: gibt.username });
            return generateAPPTokenAndRefreshToken(result.authUser);
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}