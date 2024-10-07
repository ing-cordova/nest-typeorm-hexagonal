import { Body, Controller, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { UpdateAuthUserUseCase } from "src/context/authUser/application/update-authuser-use-case/update-authuser-use-case";
import { AuthUser } from "src/context/authUser/domain/authuser.model";
import { UpdateAuthUserHttpDto } from "./update-authuser-http-dto";
import { UpdateAuthUserParamsHttpDto } from "./update-authuser-params-http-dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('authuser')
@Controller('authuser')
export class UpdateAuthuserController {
    constructor(private readonly updateAuthUserUseCase: UpdateAuthUserUseCase) { }

    @Patch('/update/:id')
    async run(@Param('id', ParseIntPipe) id: number, @Body() httpDto: UpdateAuthUserHttpDto): Promise<{ authUser: AuthUser }> {
        const params = new UpdateAuthUserParamsHttpDto();
        params.id = id;

        return this.updateAuthUserUseCase.execute(params, httpDto);
    }
}