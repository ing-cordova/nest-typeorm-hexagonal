import { ClassSerializerInterceptor, Controller, HttpException, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetInformationByToken } from 'src/context/decorators/get-information.decorator';
import { generateAPPTokenAndRefreshToken } from 'src/context/services/token-service';
import { FindUserProfileByUsernameUseCase } from 'src/context/api/userProfile/application/find-userprofile-by-username-use-case/find-userprofile-by-username-use-case';
import { JwtAuthRefreshGuard } from 'src/context/guards/jwt-refresh.guard';
import { AuthEndpoints, PrefixEndpointType } from 'src/context/routes/routing';

@ApiTags(PrefixEndpointType.AUTH)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class RefreshTokenController {
    constructor(private readonly findUserProfileByUsernameUseCase: FindUserProfileByUsernameUseCase,) { }

    @Post(AuthEndpoints.REFRESH_TOKEN)
    @UseGuards(JwtAuthRefreshGuard)
    @ApiResponse({
        status: 200,
        description: 'Refresh token created successfully',
    })
    async run(@GetInformationByToken() gibt: any) {
        try {
            const result = await this.findUserProfileByUsernameUseCase.execute({ username: gibt.username });
            return generateAPPTokenAndRefreshToken(result.userProfile);
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}