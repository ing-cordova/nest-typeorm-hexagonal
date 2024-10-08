import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateAuthUserUseCase } from 'src/context/authUser/application/create-authuser-use-case/create-authuser-use-case';
import { CreateAuthUserHttpDto } from './create-authuser-http-dto';
import { AuthUser } from 'src/context/authUser/domain/authuser.model';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../services/jwt.guard';
import { GetInformationByToken } from 'src/context/services/get-information.decorator';

@ApiTags('authuser')
@Controller('authuser')
export class CreateAuthUserController {
  constructor(private createAuthUserUseCase: CreateAuthUserUseCase) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({
    description: 'Atributes requerid to create a new user at the system',
    type: CreateAuthUserHttpDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        authUser: {
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
    @Body() createAuthUserHttpDto: CreateAuthUserHttpDto,@GetInformationByToken() git: any
  ): Promise<{ authUser: AuthUser }> {
    console.log(git.username);
    return await this.createAuthUserUseCase.execute({
      username: createAuthUserHttpDto.username,
      email: createAuthUserHttpDto.email,
      password: createAuthUserHttpDto.password,
    });
  }
}
