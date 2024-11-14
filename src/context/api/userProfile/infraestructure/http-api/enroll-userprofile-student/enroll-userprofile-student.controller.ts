import { Body, ClassSerializerInterceptor, Controller, HttpException, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EnrollUserProfileStudentHttpDto } from './enroll-userprofile-student-http-dto';
import { EnrollUserProfileStudentUseCase } from '../../../application/enroll-userprofile-student-use-case/enroll-userprofile-student-use-case';
import { TypeOrmUserProfileRepository } from '../../repositories/typeorm-userprofile.repository';
import { UserProfile } from '../../../domain/userprofile.model';
import { PermissionsGuard } from 'src/context/guards/permissions.guard';
import { Permissions } from 'src/context/decorators/permissions.decorator';
import { JwtAuthGuard } from 'src/context/guards/jwt.guard';

@ApiTags('user-profile')
@Controller('user-profile')
@UseInterceptors(ClassSerializerInterceptor)
export class CreateUserProfileStudentController {
    constructor(
        private enrollUserProfileStudentUseCase: EnrollUserProfileStudentUseCase,
        private readonly typeOrmUserProfileRepository: TypeOrmUserProfileRepository
    ) { }

    @Post('/student-enrollment')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @ApiBody({
        description: 'Atributes requerid to create a new user at the system',
        type: EnrollUserProfileStudentHttpDto,
    })
    @Permissions('ADD_NEW_USER')
    @ApiResponse({
        status: 201,
        description: 'The user with student role has been successfully created.',
        schema: {
            type: 'object',
            properties: {
                authUser: {
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
        @Body() createUserProfileStudentHttpDto: EnrollUserProfileStudentHttpDto
    ): Promise<{ userProfile: UserProfile }> {
        try {
            if(!createUserProfileStudentHttpDto.accepted_terms) throw new HttpException('You must accept the terms and conditions', 400);
            return await this.enrollUserProfileStudentUseCase.execute({
                first_name: createUserProfileStudentHttpDto.first_name,
                last_name: createUserProfileStudentHttpDto.last_name,
                phone_number: createUserProfileStudentHttpDto.phone_number,
                email: createUserProfileStudentHttpDto.email,
                country_id: createUserProfileStudentHttpDto.country_id,
                state_id: createUserProfileStudentHttpDto.state_id,
                accepted_terms: createUserProfileStudentHttpDto.accepted_terms,
                username: await this.generateUsername(createUserProfileStudentHttpDto.first_name, createUserProfileStudentHttpDto.last_name)
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
