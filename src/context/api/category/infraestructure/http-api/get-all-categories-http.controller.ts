import { BadRequestException, ClassSerializerInterceptor, Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PrefixEndpointType, PublicEndpoints } from "src/context/routes/routing";
import { GetAllCategoriesUseCase } from "../../application/get-all-categories-use-case/get-all-categories-use-case";

@ApiTags(PrefixEndpointType.PUBLIC)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class GetAllCategoriesController {
    constructor(private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase) { }

    @Get(PublicEndpoints.GET_CATEGORIES)
    @ApiResponse({
        status: 200,
        description: 'Get all categories',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'N/A' },
                    description: { type: 'string', example: 'Category not available' },
                },
            },
        },
    })
    async getAllCategories() {
        try {
            return await this.getAllCategoriesUseCase.execute();
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}