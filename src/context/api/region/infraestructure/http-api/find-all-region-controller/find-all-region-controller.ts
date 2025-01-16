import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindAllRegionUseCase } from "../../../application/find-all-region-use-case/find-all-region-use-case";
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
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
import { Region } from "../../../domain/region.model";

@ApiTags(PrefixEndpointType.PRIVATE)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class FindAllRegionController {
  constructor(private readonly findAllRegionUseCase: FindAllRegionUseCase) {}

  @Get(PrivateEndpoints.VIEW_ALL_REGIONS)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionEnum.VIEW_ALL_REGIONS)
  @ApiResponse({
    status: 200,
    description: "Regions found",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Americas" },
        },
      },
      example: [
        {
          id: 1,
          name: "Americas",
        },
      ],
    },
  })
  async execute(): Promise<Region[]> {
    return await this.findAllRegionUseCase.execute();
  }
}
