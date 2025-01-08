import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { FindAllIssuerTypeUseCase } from "../../../application/find-all-issuer-type-use-case/find-all-issuer-type-use-case";
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
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
export class FindAllIssuerTypeController {
  constructor(
    private readonly findAllIssuerTypeUseCase: FindAllIssuerTypeUseCase
  ) {}

  @Get(PrivateEndpoints.VIEW_ALL_ISSUER_TYPES)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionEnum.VIEW_ALL_ISSUER_TYPES)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "Issuer types found",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "N/A" },
          description: { type: "string", example: "Not Applicable" },
        },
      },
      example: [
        {
          id: 1,
          name: "N/A",
          description: "Not Applicable",
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async execute(): Promise<IssuerType[]> {
    return await this.findAllIssuerTypeUseCase.execute();
  }
}
