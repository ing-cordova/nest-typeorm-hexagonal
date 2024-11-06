import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsInt, IsString } from "class-validator";

export class EnrollAuthUserStudentHttpDto {
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

    @ApiProperty({
        type: Boolean,
        description: 'Accepted terms',
    })
    @IsBoolean()
    accepted_terms: boolean;
}