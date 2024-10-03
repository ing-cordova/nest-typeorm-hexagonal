import { IsNotEmpty, IsString } from 'class-validator';

export class FindAuthUserByUsernameHttpDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
