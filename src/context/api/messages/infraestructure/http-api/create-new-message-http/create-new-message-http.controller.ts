import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PrefixEndpointType, PublicEndpoints } from "src/context/routes/routing";
import { CreateNewMessageUseCase } from "../../../application/create-new-message-use-case/create-new-message-use-case";
import { CreateNewMessageHttpDto } from "./create-new-message-http-dto";

@ApiTags(PrefixEndpointType.PUBLIC)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class CreateNewMessageHttpController {
    constructor(private readonly createNewMessageUseCase: CreateNewMessageUseCase) { }

    @Post(PublicEndpoints.CREATE_NEW_MESSAGE)
    @ApiBody({ type: CreateNewMessageHttpDto })
    @ApiResponse({ status: 201, type: null })
    async create(@Body() createNewMessageHttpDto: CreateNewMessageHttpDto): Promise<void> {
        try {
            return await this.createNewMessageUseCase.execute(createNewMessageHttpDto);
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}