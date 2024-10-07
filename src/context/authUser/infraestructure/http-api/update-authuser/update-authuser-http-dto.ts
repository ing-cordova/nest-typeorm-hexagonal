import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateAuthUserHttpDto {
    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    email: string;
}