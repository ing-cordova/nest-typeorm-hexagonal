import { Body, Controller, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { DeleteAuthUserByIdUseCase } from "src/context/authUser/application/delete-authuser-by-id-use-case/delete-authuser-by-id-use-case";
import { DeleteByIdHttpDto } from "./delete-by-id-http-dto";

@Controller('authuser')
export class DeleteAuthUserByIdController {

    constructor(private readonly deleteAuthUserByIdUseCase: DeleteAuthUserByIdUseCase) {}

    @Delete('/delete/:id')
    async run(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const params = new DeleteByIdHttpDto();
        params.id = id;
        await this.deleteAuthUserByIdUseCase.execute(params);
    }
}