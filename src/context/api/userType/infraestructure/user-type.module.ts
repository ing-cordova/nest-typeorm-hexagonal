import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserType } from "../domain/user-type.model";

const config = new ConfigService();

@Module({
    imports: [
        TypeOrmModule.forFeature([UserType]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ],
})

export class UserTypeModule { }