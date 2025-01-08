import { BadRequestException, ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PrefixEndpointType, PrivateEndpoints } from "src/context/routes/routing";
import { ViewAllPaymentMethodsUseCase } from "../../../application/view-all-payment-methods-use-case/view-all-payment-methods-use-case";
import { JwtAuthGuard } from "src/context/guards/jwt.guard";
import { PermissionsGuard } from "src/context/guards/permissions.guard";
import { Permissions } from "src/context/decorators/permissions.decorator";
import { PermissionEnum } from "src/context/api/permission/domain/permission.enum";

@ApiTags(PrefixEndpointType.PRIVATE)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class ViewAllPaymentMethodsController {
    constructor(private readonly viewAllPaymentMethodsUseCase: ViewAllPaymentMethodsUseCase) { }

    @Get(PrivateEndpoints.VIEW_ALL_PAYMENT_METHODS)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions(PermissionEnum.VIEW_ALL_PAYMENT_METHODS)
    @ApiResponse({ status: 200, type: null })
    @ApiBearerAuth()
    async execute() {
        try{
            return await this.viewAllPaymentMethodsUseCase.execute()
        }
        catch(error){
            throw new BadRequestException(error.message)
        }
    }
}