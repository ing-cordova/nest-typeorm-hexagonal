import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindAllSubRegionUseCase } from "../../../application/find-all-sub-region-use-case/find-all-sub-region-use-case";
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  PrefixEndpointType,
  PrivateEndpoints,
} from "src/context/routes/routing";
import { PermissionsGuard } from "src/context/guards/permissions.guard";
import { JwtAuthGuard } from "src/context/guards/jwt.guard";
import { Permissions } from "src/context/decorators/permissions.decorator";
import { PermissionEnum } from "src/context/api/permission/domain/permission.enum";
import { SubRegion } from "../../../domain/sub-region.model";

@ApiTags(PrefixEndpointType.PRIVATE)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class FindAllSubRegionController {
  constructor(
    private readonly findAllSubRegionUseCase: FindAllSubRegionUseCase
  ) {}

  @Get(PrivateEndpoints.VIEW_ALL_SUB_REGIONS)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionEnum.VIEW_ALL_SUB_REGIONS)
  @ApiQuery({
    name: "region_id",
    required: false,
    type: Number,
    description: "Region id",
  })
  @ApiResponse({
    status: 200,
    description: "Sub regions found",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          region_id: { type: "integer", example: 1 },
          name: { type: "string", example: "Central America" },
          region: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              name: { type: "string", example: "American" },
            },
          },
        },
      },
      example: [
        {
          id: 1,
          region_id: 1,
          name: "Central America",
          region: {
            id: 1,
            name: "American",
          },
        },
      ],
    },
  })
  async execute(@Query() query: Partial<SubRegion>): Promise<SubRegion[]> {
    return await this.findAllSubRegionUseCase.execute(query);
  }
}
