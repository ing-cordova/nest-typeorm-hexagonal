import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class GenerateUserProfileHttpDto {
    @ApiProperty({
        type: String,
        description: 'User type id',
    })
    @IsUUID()
    user_type_id: UUID;

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
        description: 'Phone number',
    })
    @IsString()
    phone_number: string;

    @ApiProperty({
        type: String,
        description: 'Email',
    })
    @IsString()
    @IsEmail({}, { message: 'Email format is not valid' })
    email: string;

    @ApiProperty({
        type: Number,
        description: 'Country id',
    })
    @IsInt()
    country_id: number;

    @ApiProperty({
        type: Number,
        description: 'State id',
    })
    @IsInt()
    state_id: number;
}