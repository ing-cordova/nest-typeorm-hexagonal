import { Body, ClassSerializerInterceptor, Controller, HttpException, Param, ParseIntPipe, Patch, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserProfileUseCase } from "../../../application/update-userprofile-use-case/update-userprofile-use-case";
import { UserProfile } from "../../../domain/userprofile.model";
import { GetInformationByToken } from "src/context/decorators/get-information.decorator";
import { PrefixEndpointType, PrivateEndpoints } from "src/context/routes/routing";
import { JwtAuthGuard } from "src/context/guards/jwt.guard";
import { PermissionsGuard } from "src/context/guards/permissions.guard";
import { Permissions } from "src/context/decorators/permissions.decorator";
import { PermissionEnum } from "src/context/api/permission/domain/permission.enum";
import { UpdateUserProfileHttpDto } from "./update-userprofile-http-dto";

@ApiTags(PrefixEndpointType.PRIVATE)
@ApiBearerAuth()
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UpdateUserProfileController {
    constructor(private readonly updateUserProfileUseCase: UpdateUserProfileUseCase) { }

    @ApiBody({
        description: 'Atributes requerid to update a user at the system',
        type: UserProfile,
      })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully updated.',
        schema: {
            type: 'object',
            properties: {
                userProfile: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 16 },
                        user_type_id: { type: 'integer', example: 3 },
                        first_name: { type: 'string', example: 'John' },
                        last_name: { type: 'string', example: 'Doe' },
                        phone_number: { type: 'string', example: '90764567' },
                        email: { type: 'string', example: 'johndoe@yopmail.com' },
                        username: { type: 'string', example: 'johndoe' },
                        country_id: { type: 'integer', example: 66 },
                        state_id: { type: 'integer', example: 1109 },
                        address: { type: 'string', example: 'Calle 123' },
                        accepted_terms: { type: 'boolean', example: true },
                        created_at: { type: 'string', format: 'date-time', example: '2024-11-05T15:17:41.081Z' },
                        second_name: { type: 'string', nullable: true, example: null },
                        second_last_name: { type: 'string', nullable: true, example: null },
                        email_verified_at: { type: 'string', format: 'date-time', nullable: true, example: null },
                        updated_at: { type: 'string', format: 'date-time', nullable: true, example: null },
                        deleted_at: { type: 'string', format: 'date-time', nullable: true, example: null },
                        is_temporal_password: { type: 'boolean', example: true }
                    },
                },
            },
        },
    })
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions(PermissionEnum.UPDATE_PROFILE)
    @Patch(PrivateEndpoints.UPDATE_PROFILE)
    async run(@GetInformationByToken() gibt: any, @Body() httpDto: UpdateUserProfileHttpDto): Promise<{ userProfile: UserProfile }> {
        try {
            const username = gibt.username;
            return this.updateUserProfileUseCase.execute(username, httpDto);
        }
        catch (error) {
            throw new HttpException(error.message, 400);
        }
    }
}