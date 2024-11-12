import { IsInt } from "class-validator";

export class DeleteByIdHttpDto {
    @IsInt()
    id: number;
}