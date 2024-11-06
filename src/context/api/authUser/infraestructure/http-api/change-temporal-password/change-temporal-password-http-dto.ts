import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangeTemporalPasswordHttpDto {
    @ApiProperty({
        type: String,
        description: 'Password',
    })
    @IsString()
    password: string;
}
