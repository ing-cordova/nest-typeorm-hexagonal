import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllAuthUserUseCase } from 'src/context/authUser/application/get-all-authuser-use-case/get-all-authuser-use-case';
import { AuthUser } from 'src/context/authUser/domain/authuser.model';

@ApiTags('authuser')
@Controller('authuser')
export class GetAllAuthuserController {
  constructor(private readonly getAllAuthuserUseCase: GetAllAuthUserUseCase) { }

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
  async run(): Promise<{ authUsers: AuthUser[] }> {
    return await this.getAllAuthuserUseCase.execute();
  }
}
