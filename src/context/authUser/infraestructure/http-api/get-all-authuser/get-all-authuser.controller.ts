import { Controller, Get } from '@nestjs/common';
import { GetAllAuthUserUseCase } from 'src/context/authUser/application/get-all-authuser-use-case/get-all-authuser-use-case';
import { PrimitiveAuthUser } from 'src/context/authUser/domain/authuser.model';

@Controller('authuser')
export class GetAllAuthuserController {
  constructor(private readonly getAllAuthuserUseCase: GetAllAuthUserUseCase) {}

  @Get('all')
  async run(): Promise<{ authUsers: PrimitiveAuthUser[] }> {
    return await this.getAllAuthuserUseCase.execute();
  }
}
