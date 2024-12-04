import { Body, ClassSerializerInterceptor, Controller, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangeTemporalPasswordUseCase } from '../../../application/change-temporal-password-use-case/change-temporal-password-use-case';
import { ChangeTemporalPasswordHttpDto } from './change-temporal-password-http-dto';
import { GetInformationByToken } from 'src/context/services/get-information.decorator';
import { JwtAuthGuard } from 'src/context/guards/jwt.guard';
import { PermissionsGuard } from 'src/context/guards/permissions.guard';
import { Permissions } from 'src/context/decorators/permissions.decorator';
import { PermissionEnum } from 'src/context/api/permission/domain/permission.enum';
import { AuthEndpoints, PrefixEndpointType } from 'src/context/routes/routing';

@ApiTags(PrefixEndpointType.AUTH)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class ChangeTemporalPasswordController {
    constructor(private changeTemporalPasswordUseCase: ChangeTemporalPasswordUseCase) { }

    @Patch(AuthEndpoints.CHANGE_TEMPORAL_PASSWORD)
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions(PermissionEnum.CHANGE_TEMPORAL_PASSWORD)
    @ApiBody({
        description: 'Atributes requerid to change temporal password',
        type: ChangeTemporalPasswordHttpDto,
    })
    @ApiResponse({
        status: 200,
    })
    async run(
        @Body() changeTemporalPasswordHttpDto: ChangeTemporalPasswordHttpDto,
        @GetInformationByToken() gibt: any
    ) {
        return await this.changeTemporalPasswordUseCase.execute({
            username: gibt.username,
            password: changeTemporalPasswordHttpDto.password,
        });
    }
}