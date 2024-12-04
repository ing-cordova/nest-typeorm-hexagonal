import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrefixEndpointType, PublicEndpoints } from "src/context/routes/routing";
import { GetCountriesUseCase } from "../../../application/get-countries-use-case/get-countries-use-case";

@ApiTags(PrefixEndpointType.PUBLIC)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class GetAllCountriesController {
    constructor(private getAllCountriesUseCase: GetCountriesUseCase) { }

    @Get(PublicEndpoints.GET_ALL_COUNTRIES)
    async getAllCountries() {
        return await this.getAllCountriesUseCase.execute();
    }
}