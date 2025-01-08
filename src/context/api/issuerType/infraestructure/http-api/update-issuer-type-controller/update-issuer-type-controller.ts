
import { Body, ClassSerializerInterceptor, Controller, HttpException, Param, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UpdateIssuerTypeUseCase } from '../../../application/update-issuer-type-use-case/update-issuer-type-use-case';
import { UpdateIssuerTypeHttpDto } from './update-issuer-type-http-dto';
import { IssuerType } from '../../../domain/issuer-type.model';
import { PrefixEndpointType, PrivateEndpoints } from 'src/context/routes/routing';
import { JwtAuthGuard } from 'src/context/guards/jwt.guard';
import { PermissionsGuard } from 'src/context/guards/permissions.guard';
import { Permissions } from 'src/context/decorators/permissions.decorator';
import { PermissionEnum } from 'src/context/api/permission/domain/permission.enum';

@ApiTags(PrefixEndpointType.PRIVATE)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UpdateIssuerTypeController {
    constructor(private readonly updateIssuerTypeUseCase: UpdateIssuerTypeUseCase) {}

    @Put(PrivateEndpoints.UPDATE_ISSUER_TYPE)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions(PermissionEnum.UPDATE_ISSUER_TYPE)
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number' })
    @ApiBody({ type: UpdateIssuerTypeHttpDto })
    @ApiResponse({ status: 200 })
    async execute(@Param('id') id: number, @Body() dto: UpdateIssuerTypeHttpDto): Promise<void> {
        await this.updateIssuerTypeUseCase.execute({ ...dto, id });
    }
}
