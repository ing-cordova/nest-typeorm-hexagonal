import { Body, ClassSerializerInterceptor, Controller, Param, ParseIntPipe, Patch, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserProfileUseCase } from "../../../application/update-userprofile-use-case/update-userprofile-use-case";
import { UpdateUserProfileParamsHttpDto } from "./update-userprofile-params-http-dto";
import { UpdateUserProfileHttpDto } from "./update-userprofile-http-dto";
import { UserProfile } from "../../../domain/userprofile.model";

@ApiTags('user-profile')
@Controller('user-profile')
@UseInterceptors(ClassSerializerInterceptor)
export class UpdateUserProfileController {
    constructor(private readonly updateUserProfileUseCase: UpdateUserProfileUseCase) { }

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
                userProfile: {
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
    async run(@Param('id', ParseIntPipe) id: number, @Body() httpDto: UpdateUserProfileHttpDto): Promise<{ userProfile: UserProfile }> {
        const params = new UpdateUserProfileParamsHttpDto();
        params.id = id;

        return this.updateUserProfileUseCase.execute(params, httpDto);
    }
}