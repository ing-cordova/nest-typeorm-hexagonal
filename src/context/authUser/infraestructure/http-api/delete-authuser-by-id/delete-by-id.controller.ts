import { Controller, Delete, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { DeleteAuthUserByIdUseCase } from "src/context/authUser/application/delete-authuser-by-id-use-case/delete-authuser-by-id-use-case";
import { DeleteByIdHttpDto } from "./delete-by-id-http-dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/context/services/jwt.guard";
import { GetInformationByToken } from "src/context/services/get-information.decorator";

@ApiTags('authuser')
@Controller('authuser')
export class DeleteAuthUserByIdController {

    constructor(private readonly deleteAuthUserByIdUseCase: DeleteAuthUserByIdUseCase) {}

    /**
     * GIBT: Get Information By Token
     */
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'The id of the authuser',
    })
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    async run(@Param('id', ParseIntPipe) id: number, @GetInformationByToken() gibt: any): Promise<void> {
        console.log(gibt.username);
        const params = new DeleteByIdHttpDto();
        params.id = id;
        await this.deleteAuthUserByIdUseCase.execute(params);
    }
}