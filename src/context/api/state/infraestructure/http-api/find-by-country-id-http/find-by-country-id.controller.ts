import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrefixEndpointType, PrivateEndpoints, PublicEndpoints } from "src/context/routes/routing";
import { FindByCountryIdUseCase } from "../../../application/find-by-country-id-use-case/find-by-country-id-use-case";

@ApiTags(PrefixEndpointType.PUBLIC)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class FindByCountryIdController {
    constructor(private readonly findByCountryIdUseCase: FindByCountryIdUseCase) { }

    @Get(PublicEndpoints.GET_STATES_BY_COUNTRY)
    async execute(@Param('countryId') countryId: number) {
        return this.findByCountryIdUseCase.execute(countryId);
    }
}