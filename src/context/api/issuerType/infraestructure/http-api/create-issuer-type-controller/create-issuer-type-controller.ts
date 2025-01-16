import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateIssuerTypeUseCase } from "../../../application/create-issuer-type-use-case/create-issuer-type-use-case";
import { CreateIssuerTypeHttpDto } from "./create-issuer-type-http-dto";
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
export class CreateIssuerTypeController {
  constructor(
    private readonly createIssuerTypeUseCase: CreateIssuerTypeUseCase
  ) {}

  @Post(PrivateEndpoints.CREATE_NEW_ISSUER_TYPE)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(PermissionEnum.CREATE_NEW_ISSUER_TYPE)
  @ApiBearerAuth()
  @ApiBody({ type: CreateIssuerTypeHttpDto })
  @ApiResponse({ status: 201 })
  async execute(@Body() dto: CreateIssuerTypeHttpDto): Promise<void> {
    await this.createIssuerTypeUseCase.execute(dto);
  }
}
