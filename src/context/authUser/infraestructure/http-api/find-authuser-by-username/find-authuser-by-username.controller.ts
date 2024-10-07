import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FindAuthUserByUsernameUseCase } from 'src/context/authUser/application/find-authuser-by-username-use-case/find-authuser-by-username-use-case';
import { FindAuthUserByUsernameHttpDto } from './find-authuser-by-username-http-dto';
import { AuthUserNotFoundException } from 'src/context/authUser/domain/authuser-not-found.exception';
import { AuthUser } from 'src/context/authUser/domain/authuser.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authuser')
@Controller('authuser')
export class FindAuthuserByUsernameController {
  constructor(
    private readonly findAuthuserByUsernameUseCase: FindAuthUserByUsernameUseCase,
  ) {}

  @Get('/find/:username')
  async run(
    @Param() params: FindAuthUserByUsernameHttpDto,
  ): Promise<{ authuser: AuthUser }> {
    try {
      const result = await this.findAuthuserByUsernameUseCase.execute({
        username: params.username,
      });

      return { authuser: result.authUser };
    } catch (error) {
      if (error instanceof AuthUserNotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
