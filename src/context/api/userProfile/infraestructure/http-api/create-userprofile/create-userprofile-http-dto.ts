import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateUserProfileHttpDto {
  @ApiProperty({
    type: String,
    description: 'First name',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    type: String,
    description: 'Last name',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    type: String,
    description: 'Email',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: Number,
    description: 'Country id',
  })
  @IsInt()
  country_id: number;
}
