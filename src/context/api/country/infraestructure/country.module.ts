import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Country } from "../domain/country.model";
import { JwtModule } from "@nestjs/jwt";

const config = new ConfigService();
@Module({
    imports : [
        TypeOrmModule.forFeature([Country]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ] 
})

export class CountryModule {}