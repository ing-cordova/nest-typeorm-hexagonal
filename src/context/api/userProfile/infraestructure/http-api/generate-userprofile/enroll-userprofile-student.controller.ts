import { Body, ClassSerializerInterceptor, Controller, HttpException, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TypeOrmUserProfileRepository } from '../../repositories/typeorm-userprofile.repository';
import { UserProfile } from '../../../domain/userprofile.model';
import { PermissionsGuard } from 'src/context/guards/permissions.guard';
import { Permissions } from 'src/context/decorators/permissions.decorator';
import { JwtAuthGuard } from 'src/context/guards/jwt.guard';
import { PermissionEnum } from 'src/context/api/permission/domain/permission.enum';
import { PrivateEndpoints } from 'src/context/routes/routing';
import { GenerateUserProfileUseCase } from '../../../application/generate-userprofile-use-case/generate-userprofile-use-case';
import { GenerateUserProfileHttpDto } from './generate-userprofile-http-dto';


@ApiTags('private')
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class GenerateUserProfileController {
    constructor(
        private generateUserProfileUseCase: GenerateUserProfileUseCase,
        private readonly typeOrmUserProfileRepository: TypeOrmUserProfileRepository
    ) { }

    @Post(PrivateEndpoints.GENERATE_PROFILE)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({
        description: 'Atributes requerid to create a new user at the system',
        type: GenerateUserProfileHttpDto,
    })
    @Permissions(PermissionEnum.GENERATE_PROFILE)
    @ApiResponse({
        status: 201,
        description: 'The user with some role has been successfully created.',
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
        @Body() generateUserProfileHttpDto: GenerateUserProfileHttpDto
    ): Promise<{ userProfile: UserProfile }> {
        try {
            if(!generateUserProfileHttpDto.accepted_terms) throw new HttpException('You must accept the terms and conditions', 400);
            return await this.generateUserProfileUseCase.execute({
                first_name: generateUserProfileHttpDto.first_name,
                last_name: generateUserProfileHttpDto.last_name,
                phone_number: generateUserProfileHttpDto.phone_number,
                email: generateUserProfileHttpDto.email,
                country_id: generateUserProfileHttpDto.country_id,
                state_id: generateUserProfileHttpDto.state_id,
                accepted_terms: generateUserProfileHttpDto.accepted_terms,
                username: await this.generateUsername(generateUserProfileHttpDto.first_name, generateUserProfileHttpDto.last_name)
            });
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
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
