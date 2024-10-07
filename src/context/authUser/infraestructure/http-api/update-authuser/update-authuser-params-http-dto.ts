import { IsInt } from "class-validator";

export class UpdateAuthUserParamsHttpDto {
    @IsInt()
    id: number;
}