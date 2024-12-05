import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PrefixEndpointType, PrivateEndpoints, PublicEndpoints } from "src/context/routes/routing";
import { FindByCountryIdUseCase } from "../../../application/find-by-country-id-use-case/find-by-country-id-use-case";

@ApiTags(PrefixEndpointType.PUBLIC)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class FindByCountryIdController {
    constructor(private readonly findByCountryIdUseCase: FindByCountryIdUseCase) { }

    @Get(PublicEndpoints.GET_STATES_BY_COUNTRY)
    @ApiResponse({
        status: 200,
        description: 'Get all states filtered by country ID',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1107 },
                    name: { type: 'string', example: 'Ahuachapán' },
                    state_code: { type: 'string', example: 'AH' },
                    country_id: { type: 'integer', example: 66 },
                },
            },
        },
    })
    async execute(@Param('countryId') countryId: number) {
        return this.findByCountryIdUseCase.execute(countryId);
    }
}