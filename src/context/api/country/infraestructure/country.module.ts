import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Country } from "../domain/country.model";
import { JwtModule } from "@nestjs/jwt";
import { GetAllCountriesController } from "./http-api/get-all-countries-http/get-all-countries.controller";
import { GetCountriesUseCase } from "../application/get-countries-use-case/get-countries-use-case";
import { TypeOrmCountryRepository } from "./repositories/typeorm-country.repository";
import { CountryRepository } from "../domain/country.repository";
import { JwtStrategy } from "src/context/services/jwt/jwt.strategy";

const config = new ConfigService();
@Module({
    imports: [
        TypeOrmModule.forFeature([Country]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ],
    controllers: [
        GetAllCountriesController,
    ],
    providers: [
        GetCountriesUseCase,
        TypeOrmCountryRepository,
        {
            provide: CountryRepository,
            useClass: TypeOrmCountryRepository
        },
        JwtStrategy,
    ],
    exports: [GetCountriesUseCase]
})

export class CountryModule { }