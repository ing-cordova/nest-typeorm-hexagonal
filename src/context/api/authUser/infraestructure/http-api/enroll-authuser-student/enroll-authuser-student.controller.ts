import { Body, ClassSerializerInterceptor, Controller, HttpException, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthUser } from 'src/context/api/authUser/domain/authuser.model';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TypeOrmAuthUserRepository } from '../../repositories/typeorm-authuser.repository';
import { EnrollAuthUserStudentUseCase } from '../../../application/enroll-authuser-student-use-case/enroll-authuser-student-use-case';
import { EnrollAuthUserStudentHttpDto } from './enroll-authuser-student-http-dto';
import { JwtAuthGuard } from 'src/context/services/jwt/jwt.guard';

@ApiTags('authuser')
@Controller('authuser')
@UseInterceptors(ClassSerializerInterceptor)
export class CreateAuthUserStudentController {
    constructor(
        private enrollAuthUserStudentUseCase: EnrollAuthUserStudentUseCase,
        private readonly typeOrmAuthUserRepository: TypeOrmAuthUserRepository
    ) { }

    @Post('/student-enrollment')
    @UseGuards(JwtAuthGuard)
    @ApiBody({
        description: 'Atributes requerid to create a new user at the system',
        type: EnrollAuthUserStudentHttpDto,
    })
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
        @Body() createAuthUserStudentHttpDto: EnrollAuthUserStudentHttpDto
    ): Promise<{ authUser: AuthUser }> {
        try {
            if(!createAuthUserStudentHttpDto.accepted_terms) throw new HttpException('You must accept the terms and conditions', 400);
            return await this.enrollAuthUserStudentUseCase.execute({
                first_name: createAuthUserStudentHttpDto.first_name,
                last_name: createAuthUserStudentHttpDto.last_name,
                phone_number: createAuthUserStudentHttpDto.phone_number,
                email: createAuthUserStudentHttpDto.email,
                country_id: createAuthUserStudentHttpDto.country_id,
                state_id: createAuthUserStudentHttpDto.state_id,
                accepted_terms: createAuthUserStudentHttpDto.accepted_terms,
                username: await this.generateUsername(createAuthUserStudentHttpDto.first_name, createAuthUserStudentHttpDto.last_name)
            });
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    private generateUsername = async (firstName: string, lastName: string): Promise<string> => {
        try {
            let username = `${firstName[0].toLowerCase()}${lastName.toLowerCase()}`;
            let userExists = await this.typeOrmAuthUserRepository.findByUsername(username);

            while (userExists) {
                const randomSuffix = Math.random() < 0.5
                    ? String.fromCharCode(97 + Math.floor(Math.random() * 26))
                    : Math.floor(Math.random() * 10).toString();

                username = `${firstName[0].toLowerCase()}${lastName.toLowerCase()}${randomSuffix}`;
                userExists = await this.typeOrmAuthUserRepository.findByUsername(username);
            }

            return username;
        }
        catch (error) {
            throw new HttpException('Error while generating username...', error.status);
        }
    };
}
