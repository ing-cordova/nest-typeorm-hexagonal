import { BadRequestException, ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUserProfileUseCase } from '../../../application/get-all-userprofile-use-case/get-all-userprofile-use-case';
import { UserProfile } from '../../../domain/userprofile.model';
import { JwtAuthGuard } from 'src/context/guards/jwt.guard';
import { PermissionsGuard } from 'src/context/guards/permissions.guard';
import { Permissions } from 'src/context/decorators/permissions.decorator';
import { PermissionEnum } from 'src/context/api/permission/domain/permission.enum';
import { PrefixEndpointType, PrivateEndpoints } from 'src/context/routes/routing';

@ApiTags(PrefixEndpointType.PRIVATE)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class GetAllUserProfileqController {
  constructor(private readonly getAllUserProfileUseCase: GetAllUserProfileUseCase) { }

  @ApiResponse({
    status: 200,
    description: 'Get all userProfiles',
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionEnum.VIEW_ALL_PROFILE)
  @Get(PrivateEndpoints.VIEW_ALL_PROFILE)
  async run(): Promise<{ userProfiles: UserProfile[] }> {
    try {
      return await this.getAllUserProfileUseCase.execute();
    }
    catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
