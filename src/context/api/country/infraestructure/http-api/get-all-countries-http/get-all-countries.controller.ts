import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  PrefixEndpointType,
  PublicEndpoints,
} from "src/context/routes/routing";
import { GetCountriesUseCase } from "../../../application/get-countries-use-case/get-countries-use-case";

@ApiTags(PrefixEndpointType.PUBLIC)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class GetAllCountriesController {
  constructor(private getAllCountriesUseCase: GetCountriesUseCase) {}

  @Get(PublicEndpoints.GET_ALL_COUNTRIES)
  @ApiResponse({
    status: 200,
    description: "Get all countries",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Afghanistan" },
          iso2: { type: "string", example: "AF" },
          iso3: { type: "string", example: "AFG" },
          phone_code: { type: "string", example: "93" },
          region_id: { type: "integer", example: 1 },
          sub_region_id: { type: "integer", example: 1 },
          currency: { type: "string", example: "AFN" },
          currency_name: { type: "string", example: "Afghan afghani" },
          currency_symbol: { type: "string", example: "؋" },
          nationality: { type: "string", example: "Afghan" },
          region: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              name: { type: "string", example: "Asia" },
            },
          },
          sub_region: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              name: { type: "string", example: "Southern Asia" },
            },
          },
        },
      },
    },
  })
  async getAllCountries() {
    return await this.getAllCountriesUseCase.execute();
  }
}
