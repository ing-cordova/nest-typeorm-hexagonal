import { ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUserProfileByUsernameUseCase } from '../../../application/find-userprofile-by-username-use-case/find-userprofile-by-username-use-case';
import { FindUserProfileByUsernameHttpDto } from './find-userprofile-by-username-http-dto';
import { UserProfile } from '../../../domain/userprofile.model';
import { UserProfileNotFoundException } from '../../../domain/userprofile-not-found.exception';

@ApiTags('user-profile')
@Controller('user-profile')
@UseInterceptors(ClassSerializerInterceptor)
export class FindUserProfileByUsernameController {
  constructor(
    private readonly findUserProfileByUsernameUseCase: FindUserProfileByUsernameUseCase,
  ) {}

  @ApiParam({
    name: 'username',
    type: String,
    required: true,
    description: 'The username of the userProfile',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the userProfile found',
    schema: {
      type: 'object',
      properties: {
        userProfile: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            username: { type: 'string', example: 'testuser' },
            email: { type: 'string', example: 'testuser@example.com' },
            password: { type: 'string', example: 'hashedPassword' },
          },
        },
      },
    },
  })
  @Get('/find/:username')
  async run(
    @Param() params: FindUserProfileByUsernameHttpDto,
  ): Promise<{ userProfile: UserProfile }> {
    try {
      const result = await this.findUserProfileByUsernameUseCase.execute({
        username: params.username,
      });

      return { userProfile: result.userProfile };
    } catch (error) {
      if (error instanceof UserProfileNotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
