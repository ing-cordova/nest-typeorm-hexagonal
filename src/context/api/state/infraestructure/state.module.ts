import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { State } from "../domain/state.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

const config = new ConfigService();

@Module({
    imports: [
        TypeOrmModule.forFeature([State]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ],
})

export class StateModule {}