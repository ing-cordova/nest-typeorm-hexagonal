import { ClassSerializerInterceptor, Controller, HttpException, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetInformationByToken } from 'src/context/services/get-information.decorator';
import { generateAPPTokenAndRefreshToken } from 'src/context/services/token-service';
import { FindAuthUserByUsernameUseCase } from 'src/context/api/authUser/application/find-authuser-by-username-use-case/find-authuser-by-username-use-case';
import { JwtAuthRefreshGuard } from 'src/context/services/jwt/jwt-refresh.guard';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class RefreshTokenController {
    constructor(private readonly findAuthuserByUsernameUseCase: FindAuthUserByUsernameUseCase,) { }

    @Post('/refresh-token')
    @UseGuards(JwtAuthRefreshGuard)
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