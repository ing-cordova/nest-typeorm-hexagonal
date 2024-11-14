import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserProfileHttpDto {
  @ApiProperty({
    type: String,
    description: 'Username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Email',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password',
  })
  @IsString()
  password: string;
}
