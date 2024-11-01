import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { Permission } from "../domain/permission.model";

const config = new ConfigService();
@Module({
    imports : [
        TypeOrmModule.forFeature([Permission]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ] 
})

export class PermissionModule {}