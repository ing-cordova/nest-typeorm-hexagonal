import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginHttpDto {
    @ApiProperty({
        type: String,
        description: 'Email',
    })
    @IsString()
    @IsEmail({}, { message: 'Email format is not valid' })
    email: string;

    @ApiProperty({
        description: 'Password',
    })
    @IsString()
    password: string;
}