import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserProfileByUsernameHttpDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
