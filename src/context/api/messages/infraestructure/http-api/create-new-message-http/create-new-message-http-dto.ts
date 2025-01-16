import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateNewMessageHttpDto {
    @ApiProperty({
        type: String,
        description: 'Full name',
    })
    @IsString()
    full_name: string

    @ApiProperty({
        type: String,
        description: 'Email',
    })
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({
        type: String,
        description: 'Phone number',
    })
    @IsString()
    phone_number: string

    @ApiProperty({
        type: String,
        description: 'Message',
    })
    @IsString()
    message: string
}