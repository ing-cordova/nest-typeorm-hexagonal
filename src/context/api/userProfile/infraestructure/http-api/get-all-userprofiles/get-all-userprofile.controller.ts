import { BadRequestException, ClassSerializerInterceptor, Controller, DefaultValuePipe, Get, ParseIntPipe, Query, UseGuards, UseInterceptors } from '@nestjs/common';
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
    description: 'Returns a list of userProfiles found',
    schema: {
      type: 'object',
      properties: {
        userProfiles: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              username: { type: 'string', example: 'acordova' },
              email: { type: 'string', example: 'andrescordovaoficial@gmail.com' },
              phoneNumber: { type: 'string', example: '79677324' },
              isTemporalPassword: { type: 'boolean', example: false },
              acceptedTerms: { type: 'boolean', example: true },
              userType: {
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
            },
          },
        },
      },
    },
  })

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionEnum.VIEW_ALL_PROFILE)
  @Get(PrivateEndpoints.VIEW_ALL_PROFILE)
  async run(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number): Promise<{ data: UserProfile[], total: number, nextPage: number | null, prevPage: number | null, limit: number }> {
    try {
      return await this.getAllUserProfileUseCase.execute(page, limit);
    }
    catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
