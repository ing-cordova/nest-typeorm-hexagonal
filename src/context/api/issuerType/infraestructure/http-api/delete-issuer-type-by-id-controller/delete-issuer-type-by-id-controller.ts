import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DeleteIssuerTypeUseCase } from "../../../application/delete-issuer-type-use-case/delete-issuer-type-use-case";
import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  PrefixEndpointType,
  PrivateEndpoints,
} from "src/context/routes/routing";
import { JwtAuthGuard } from "src/context/guards/jwt.guard";
import { PermissionsGuard } from "src/context/guards/permissions.guard";
import { Permissions } from "src/context/decorators/permissions.decorator";
import { PermissionEnum } from "src/context/api/permission/domain/permission.enum";

@ApiTags(PrefixEndpointType.PRIVATE)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class DeleteIssuerTypeByIdController {
  constructor(
    private readonly deleteIssuerTypeUseCase: DeleteIssuerTypeUseCase
  ) {}

  @Delete(PrivateEndpoints.DELETE_ISSUER_TYPE)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionEnum.DELETE_ISSUER_TYPE)
  @ApiBearerAuth()
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200 })
  async execute(@Param("id") id: number): Promise<void> {
    await this.deleteIssuerTypeUseCase.execute(id);
  }
}
