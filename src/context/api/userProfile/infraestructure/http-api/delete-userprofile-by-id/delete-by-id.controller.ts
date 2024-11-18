import { ClassSerializerInterceptor, Controller, Delete, Param, ParseIntPipe, UseGuards, UseInterceptors } from "@nestjs/common";
import { DeleteByIdHttpDto } from "./delete-by-id-http-dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { GetInformationByToken } from "src/context/services/get-information.decorator";
import { DeleteUserProfileByIdUseCase } from "../../../application/delete-userprofile-by-id-use-case/delete-userprofile-by-id-use-case";
import { JwtAuthGuard } from "src/context/guards/jwt.guard";

@ApiTags('user-profile')
@Controller('user-profile')
@UseInterceptors(ClassSerializerInterceptor)
export class DeleteUserProfileByIdController {

    constructor(private readonly deleteUserProfileByIdUseCase: DeleteUserProfileByIdUseCase) {}

    /**
     * GIBT: Get Information By Token
     */
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'The id of the userProfile',
    })
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    async run(@Param('id', ParseIntPipe) id: number, @GetInformationByToken() gibt: any): Promise<void> {
        console.log(gibt.username);
        const params = new DeleteByIdHttpDto();
        params.id = id;
        await this.deleteUserProfileByIdUseCase.execute(params);
    }
}