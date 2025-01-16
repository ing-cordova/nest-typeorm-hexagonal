import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindOneIssuerTypeUseCase } from "../../../application/find-one-issuer-type-use-case/find-one-issuer-type-use-case";
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { IssuerType } from "../../../domain/issuer-type.model";
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
export class FindOneIssuerTypeByIdController {
  constructor(
    private readonly findOneIssuerTypeUseCase: FindOneIssuerTypeUseCase
  ) {}

  @Get(PrivateEndpoints.VIEW_ISSUER_TYPE_BY_ID)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionEnum.VIEW_ISSUER_TYPE_BY_ID)
  @ApiParam({ name: "id", type: "number" })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "Issuer type filtered by id",
    schema: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        name: { type: "string", example: "N/A" },
        description: { type: "string", example: "Not Applicable" },
      },
      example: {
        id: 1,
        name: "N/A",
        description: "Not Applicable",
      },
    },
  })
  async execute(@Param("id") id: number): Promise<IssuerType> {
    return await this.findOneIssuerTypeUseCase.execute(id);
  }
}
