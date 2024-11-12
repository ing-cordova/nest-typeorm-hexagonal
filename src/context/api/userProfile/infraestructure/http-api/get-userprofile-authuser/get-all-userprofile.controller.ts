import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUserProfileUseCase } from '../../../application/get-all-userprofile-use-case/get-all-userprofile-use-case';
import { UserProfile } from '../../../domain/userprofile.model';

@ApiTags('authuser')
@Controller('authuser')
@UseInterceptors(ClassSerializerInterceptor)
export class GetAllUserProfileqController {
  constructor(private readonly getAllUserProfileUseCase: GetAllUserProfileUseCase) { }

  @ApiResponse({
    status: 200,
    description: 'Get all authusers',
    schema: {
      type: 'array', // Definir que la respuesta es un array
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          username: { type: 'string', example: 'testuser' },
          email: { type: 'string', example: 'testuser@example.com' },
          password: { type: 'string', example: 'hashedPassword' },
        },
      },
    },
  })
  @Get('all')
  async run(): Promise<{ userProfiles: UserProfile[] }> {
    return await this.getAllUserProfileUseCase.execute();
  }
}
