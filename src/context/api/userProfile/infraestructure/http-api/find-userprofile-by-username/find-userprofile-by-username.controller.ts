import { ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUserProfileByUsernameUseCase } from '../../../application/find-userprofile-by-username-use-case/find-userprofile-by-username-use-case';
import { FindUserProfileByUsernameHttpDto } from './find-userprofile-by-username-http-dto';
import { UserProfile } from '../../../domain/userprofile.model';
import { UserProfileNotFoundException } from '../../../domain/userprofile-not-found.exception';
import { PrefixEndpointType, PrivateEndpoints } from 'src/context/routes/routing';
import { JwtAuthGuard } from 'src/context/guards/jwt.guard';
import { PermissionsGuard } from 'src/context/guards/permissions.guard';
import { Permissions } from 'src/context/decorators/permissions.decorator';
import { PermissionEnum } from 'src/context/api/permission/domain/permission.enum';

@ApiTags(PrefixEndpointType.PRIVATE)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class FindUserProfileByUsernameController {
  constructor(
    private readonly findUserProfileByUsernameUseCase: FindUserProfileByUsernameUseCase,
  ) { }

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
            username: { type: 'string', example: 'acordova' },
            email: { type: 'string', example: 'andrescordovaoficial@gmail.com' },
            isTemporalPassword: { type: 'boolean', example: false },
            acceptedTerms: { type: 'boolean', example: true },
            userType: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                name: { type: 'string', example: 'SuperAdministrator' },
                description: {
                  type: 'string',
                  example: 'User Type in which all the features are available'
                },
              },
            },
            country: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 66 },
                name: { type: 'string', example: 'El Salvador' },
                iso2: { type: 'string', example: 'SV' },
                iso3: { type: 'string', example: 'SLV' },
                phoneCode: { type: 'string', example: '503' },
                region: { type: 'string', example: 'Americas' },
                currency: { type: 'string', example: 'USD' },
              },
            },
            state: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1109 },
                name: { type: 'string', example: 'Chalatenango Department' },
                stateCode: { type: 'string', example: 'CH' },
              },
            },
            address: {
              type: 'string',
              example: 'Casa Matriz, Fte. a Departamental de Chalatenango'
            },
            phoneNumber: { type: 'string', example: '79677324' },
          },
        },
      },
    },
  })

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionEnum.VIEW_PROFILE)
  @Get(PrivateEndpoints.VIEW_PROFILE)
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
