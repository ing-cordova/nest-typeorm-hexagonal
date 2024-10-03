import { IsString } from 'class-validator';

export class CreateAuthUserHttpDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
