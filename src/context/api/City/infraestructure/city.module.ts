import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "../domain/city.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

const config = new ConfigService();

@Module({
    imports: [
        TypeOrmModule.forFeature([City]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ],
})

export class CityModule {}