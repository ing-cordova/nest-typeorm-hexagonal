import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateUserProfileHttpDto {
    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    email: string;
}