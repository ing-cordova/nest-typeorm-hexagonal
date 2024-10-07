import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllAuthUserUseCase } from 'src/context/authUser/application/get-all-authuser-use-case/get-all-authuser-use-case';
import { AuthUser } from 'src/context/authUser/domain/authuser.model';

@ApiTags('authuser')
@Controller('authuser')
export class GetAllAuthuserController {
  constructor(private readonly getAllAuthuserUseCase: GetAllAuthUserUseCase) {}

  @Get('all')
  async run(): Promise<{ authUsers: AuthUser[] }> {
    return await this.getAllAuthuserUseCase.execute();
  }
}
