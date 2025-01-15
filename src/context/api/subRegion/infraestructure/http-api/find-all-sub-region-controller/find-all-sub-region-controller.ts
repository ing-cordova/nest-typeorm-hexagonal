
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllSubRegionUseCase } from '../../../application/find-all-sub-region-use-case/find-all-sub-region-use-case';
import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { PrefixEndpointType, PrivateEndpoints } from 'src/context/routes/routing';
import { PermissionsGuard } from 'src/context/guards/permissions.guard';
import { JwtAuthGuard } from 'src/context/guards/jwt.guard';
import { Permissions } from 'src/context/decorators/permissions.decorator';
import { PermissionEnum } from 'src/context/api/permission/domain/permission.enum';
import { SubRegion } from '../../../domain/sub-region.model';

@ApiTags(PrefixEndpointType.PRIVATE)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class FindAllSubRegionController {
    constructor(private readonly findAllSubRegionUseCase: FindAllSubRegionUseCase) {}

    @Get(PrivateEndpoints.VIEW_ALL_SUB_REGIONS)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions(PermissionEnum.VIEW_ALL_SUB_REGIONS)
    async execute(): Promise<SubRegion[]> {
        return await this.findAllSubRegionUseCase.execute();
    }
}
