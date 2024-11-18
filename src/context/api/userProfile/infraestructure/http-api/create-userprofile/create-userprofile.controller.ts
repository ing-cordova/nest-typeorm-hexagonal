import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserProfileUseCase } from '../../../application/create-userprofile-use-case/create-userprofile-use-case';
import { CreateUserProfileHttpDto } from './create-userprofile-http-dto';
import { UserProfile } from '../../../domain/userprofile.model';

@ApiTags('user-profile')
@Controller('user-profile')
@UseInterceptors(ClassSerializerInterceptor)
export class CreateUserProfileController {
  constructor(private createUserProfileUseCase: CreateUserProfileUseCase) { }

  @Post()
  @ApiBody({
    description: 'Atributes requerid to create a new user at the system',
    type: CreateUserProfileHttpDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
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
  async run(
    @Body() createUserProfileHttpDto: CreateUserProfileHttpDto
  ): Promise<{ userProfile: UserProfile }> {
    return await this.createUserProfileUseCase.execute({
      username: createUserProfileHttpDto.username,
      email: createUserProfileHttpDto.email,
      password: createUserProfileHttpDto.password,
    });
  }
}
