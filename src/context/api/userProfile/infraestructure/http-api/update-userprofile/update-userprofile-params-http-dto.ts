import { IsInt } from "class-validator";

export class UpdateUserProfileParamsHttpDto {
    @IsInt()
    id: number;
}