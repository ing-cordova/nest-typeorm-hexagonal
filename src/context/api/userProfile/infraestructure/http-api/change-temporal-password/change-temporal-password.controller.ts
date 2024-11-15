import { Body, ClassSerializerInterceptor, Controller, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangeTemporalPasswordUseCase } from '../../../application/change-temporal-password-use-case/change-temporal-password-use-case';
import { ChangeTemporalPasswordHttpDto } from './change-temporal-password-http-dto';
import { GetInformationByToken } from 'src/context/services/get-information.decorator';
import { JwtAuthGuard } from 'src/context/guards/jwt.guard';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class ChangeTemporalPasswordController {
    constructor(private changeTemporalPasswordUseCase: ChangeTemporalPasswordUseCase) { }

    @Patch('change-temporal-password')
    @UseGuards(JwtAuthGuard)
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