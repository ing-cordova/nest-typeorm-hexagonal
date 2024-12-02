import { Body, ClassSerializerInterceptor, Controller, HttpException, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserProfileUseCase } from '../../../application/create-userprofile-use-case/create-userprofile-use-case';
import { CreateUserProfileHttpDto } from './create-userprofile-http-dto';
import { UserProfile } from '../../../domain/userprofile.model';
import { UserTypeEnum } from 'src/context/api/userType/domain/user-type.enum';
import { PublicEndpoints } from 'src/context/routes/routing';
import { TypeOrmUserProfileRepository } from '../../repositories/typeorm-userprofile.repository';
import { Permissions } from 'src/context/decorators/permissions.decorator';
import { PermissionEnum } from 'src/context/api/permission/domain/permission.enum';

@ApiTags('public')
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class CreateUserProfileController {
  constructor(private createUserProfileUseCase: CreateUserProfileUseCase, private readonly typeOrmUserProfileRepository: TypeOrmUserProfileRepository) { }

  @Post(PublicEndpoints.CREATE_PROFILE)
  @Permissions(PermissionEnum.CREATE_PROFILE)
  @ApiBody({
    description: 'Atributes requerid to create a new user at the system',
    type: CreateUserProfileHttpDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        userProfile: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 16 },
            user_type_id: { type: 'integer', example: 3 },
            first_name: { type: 'string', example: 'John' },
            last_name: { type: 'string', example: 'Doe' },
            phone_number: { type: 'string', example: '90764567' },
            email: { type: 'string', example: 'johndoe@yopmail.com' },
            username: { type: 'string', example: 'johndoe' },
            country_id: { type: 'integer', example: 66 },
            state_id: { type: 'integer', example: 1109 },
            address: { type: 'string', example: 'Calle 123' },
            accepted_terms: { type: 'boolean', example: true },
            created_at: { type: 'string', format: 'date-time', example: '2024-11-05T15:17:41.081Z' },
            second_name: { type: 'string', nullable: true, example: null },
            second_last_name: { type: 'string', nullable: true, example: null },
            email_verified_at: { type: 'string', format: 'date-time', nullable: true, example: null },
            updated_at: { type: 'string', format: 'date-time', nullable: true, example: null },
            deleted_at: { type: 'string', format: 'date-time', nullable: true, example: null },
            is_temporal_password: { type: 'boolean', example: true }
          },
        },
      },
    },
  })
  async run(
    @Body() createUserProfileHttpDto: CreateUserProfileHttpDto
  ): Promise<{ userProfile: UserProfile }> {
    return await this.createUserProfileUseCase.execute({
      first_name: createUserProfileHttpDto.first_name,
      last_name: createUserProfileHttpDto.last_name,
      username: await this.generateUsername(createUserProfileHttpDto.first_name, createUserProfileHttpDto.last_name),
      email: createUserProfileHttpDto.email,
      password: createUserProfileHttpDto.password,
      country_id: createUserProfileHttpDto.country_id,
      user_type_id: UserTypeEnum.STUDENT // Default user type
    });
  }

  private generateUsername = async (firstName: string, lastName: string): Promise<string> => {
    try {
      let username = `${firstName[0].toLowerCase()}${lastName.toLowerCase()}`;
      let userExists = await this.typeOrmUserProfileRepository.findByUsername(username);

      while (userExists) {
        const randomSuffix = Math.random() < 0.5
          ? String.fromCharCode(97 + Math.floor(Math.random() * 26))
          : Math.floor(Math.random() * 10).toString();

        username = `${firstName[0].toLowerCase()}${lastName.toLowerCase()}${randomSuffix}`;
        userExists = await this.typeOrmUserProfileRepository.findByUsername(username);
      }

      return username;
    }
    catch (error) {
      throw new HttpException('Error while generating username...', error.status);
    }
  };
}
