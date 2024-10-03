import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthUserUseCase } from 'src/context/authUser/application/create-authuser-use-case/create-authuser-use-case';
import { CreateAuthUserHttpDto } from './create-authuser-http-dto';
import { PrimitiveAuthUser } from 'src/context/authUser/domain/authuser.model';

@Controller('authuser')
export class CreateAuthUserController {
  constructor(private createAuthUserUseCase: CreateAuthUserUseCase) {}

  @Post()
  async run(
    @Body() createAuthUserHttpDto: CreateAuthUserHttpDto,
  ): Promise<{ authUser: PrimitiveAuthUser }> {
    return await this.createAuthUserUseCase.execute({
      username: createAuthUserHttpDto.username,
      email: createAuthUserHttpDto.email,
      password: createAuthUserHttpDto.password,
    });
  }
}
