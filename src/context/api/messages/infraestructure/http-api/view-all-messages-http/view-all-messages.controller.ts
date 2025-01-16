import { BadRequestException, ClassSerializerInterceptor, Controller, DefaultValuePipe, Get, ParseIntPipe, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PrefixEndpointType, PrivateEndpoints } from "src/context/routes/routing";
import { ViewAllMessagesUseCase } from "../../../application/view-all-messages-use-case/view-all-messages-use-case";
import { JwtAuthGuard } from "src/context/guards/jwt.guard";
import { PermissionsGuard } from "src/context/guards/permissions.guard";
import { Permissions } from "../../../../../decorators/permissions.decorator";
import { PermissionEnum } from "src/context/api/permission/domain/permission.enum";

@ApiTags(PrefixEndpointType.PRIVATE)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class ViewAllMessagesHttpController {
    constructor(private readonly viewAllMessagesUseCase: ViewAllMessagesUseCase) { }

    @Get(PrivateEndpoints.VIEW_ALL_MESSAGES)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions(PermissionEnum.VIEW_ALL_MESSAGES)
    @ApiBearerAuth()
    async viewAllMessages(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number) {
        try {
            return await this.viewAllMessagesUseCase.execute(page, limit);
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}