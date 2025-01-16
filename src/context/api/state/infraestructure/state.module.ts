import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { State } from "../domain/state.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { FindByCountryIdController } from "./http-api/find-by-country-id-http/find-by-country-id.controller";
import { FindByCountryIdUseCase } from "../application/find-by-country-id-use-case/find-by-country-id-use-case";
import { JwtStrategy } from "src/context/services/jwt/jwt.strategy";
import { TypeOrmStateRepository } from "./repositories/typeorm-state.repository";
import { StateRepository } from "../domain/state.repository";

const config = new ConfigService();

@Module({
    imports: [
        TypeOrmModule.forFeature([State]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ],
    controllers: [FindByCountryIdController],
    providers: [FindByCountryIdUseCase,
        TypeOrmStateRepository,
        {
            provide: StateRepository,
            useClass: TypeOrmStateRepository
        },
        JwtStrategy,
    ],
    exports: [FindByCountryIdUseCase]

})

export class StateModule { }