import { BadRequestException, ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PrefixEndpointType, PublicEndpoints } from "src/context/routes/routing";
import { FindByCategoryIdUseCase } from "../../application/find-by-category-id-use-case/find-by-category-id-use-case";

@ApiTags(PrefixEndpointType.PUBLIC)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class FindByCategoryIdController {
    constructor(private readonly findByCategoryIdUseCase: FindByCategoryIdUseCase) { }

    @Get(PublicEndpoints.GET_SUBCATEGORIES_BY_CATEGORY_ID)
    @ApiParam({ name: 'categoryId', type: 'number', required: true })
    @ApiResponse({
        status: 200,
        description: 'Get all subcategories',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 4 },
                    category_id: { type: 'integer', example: 3 },
                    name: { type: 'string', example: 'INTELLIGENCE ARTIFICIELLE (IA)' },
                    description: { type: 'string', example: 'Sub Category for Artificial Intelligence' },
                    category: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer', example: 3 },
                            name: { type: 'string', example: 'TECHNOLOGY' },
                            description: { type: 'string', example: 'Category for technology' },
                        },
                    },
                },
            },
        },
    })

    async findByCategoryId(@Param('categoryId') categoryId: number) {
        try {
            return this.findByCategoryIdUseCase.execute(categoryId);
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}