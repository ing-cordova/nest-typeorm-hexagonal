import { Body, ClassSerializerInterceptor, Controller, Param, ParseIntPipe, Patch, UseInterceptors } from "@nestjs/common";
import { UpdateAuthUserUseCase } from "src/context/api/authUser/application/update-authuser-use-case/update-authuser-use-case";
import { AuthUser } from "src/context/api/authUser/domain/authuser.model";
import { UpdateAuthUserHttpDto } from "./update-authuser-http-dto";
import { UpdateAuthUserParamsHttpDto } from "./update-authuser-params-http-dto";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('authuser')
@Controller('authuser')
@UseInterceptors(ClassSerializerInterceptor)
export class UpdateAuthuserController {
    constructor(private readonly updateAuthUserUseCase: UpdateAuthUserUseCase) { }

    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'The id of the auth user to update',
    })
    @ApiBody({
        description: 'The user information to update',
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'testuser' },
                email: { type: 'string', example: 'testuser@example.com' },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.',
        schema: {
            type: 'object',
            properties: {
                authUser: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        username: { type: 'string', example: 'testuser' },
                        email: { type: 'string', example: 'testuser@example.com' },
                        password: { type: 'string', example: 'hashedPassword' },
                    },
                },
            },
        },
    })
    @Patch('/update/:id')
    async run(@Param('id', ParseIntPipe) id: number, @Body() httpDto: UpdateAuthUserHttpDto): Promise<{ authUser: AuthUser }> {
        const params = new UpdateAuthUserParamsHttpDto();
        params.id = id;

        return this.updateAuthUserUseCase.execute(params, httpDto);
    }
}