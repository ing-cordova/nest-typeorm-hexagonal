import { BadRequestException, ClassSerializerInterceptor, Controller, Delete, Param, ParseIntPipe, UseGuards, UseInterceptors } from "@nestjs/common";
import { DeleteByIdHttpDto } from "./delete-by-id-http-dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { GetInformationByToken } from "src/context/services/get-information.decorator";
import { DeleteUserProfileByIdUseCase } from "../../../application/delete-userprofile-by-id-use-case/delete-userprofile-by-id-use-case";
import { JwtAuthGuard } from "src/context/guards/jwt.guard";
import { PermissionsGuard } from "src/context/guards/permissions.guard";
import { Permissions } from "src/context/decorators/permissions.decorator";
import { PermissionEnum } from "src/context/api/permission/domain/permission.enum";
import { PrefixEndpointType, PrivateEndpoints } from "src/context/routes/routing";

@ApiTags(PrefixEndpointType.PRIVATE)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class DeleteUserProfileByIdController {

    constructor(private readonly deleteUserProfileByIdUseCase: DeleteUserProfileByIdUseCase) { }

    /**
     * GIBT: Get Information By Token
     */
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'The id of the userProfile',
    })
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions(PermissionEnum.DELETE_PROFILE)
    @Delete(PrivateEndpoints.DELETE_PROFILE)
    async run(@Param('id', ParseIntPipe) id: number, @GetInformationByToken() gibt: any): Promise<void> {
        try {

            if(id === 1) throw new BadRequestException('You cannot delete this profile');
            
            const params = new DeleteByIdHttpDto();
            params.id = id;
            await this.deleteUserProfileByIdUseCase.execute(params);
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}