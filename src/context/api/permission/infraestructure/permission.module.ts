import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { Permission } from "../domain/permission.model";
import { PermissionService } from "src/context/services/permissions.service";
import { PermissionUserType } from "../../permissionUserType/domain/permission-user-type.model";

const config = new ConfigService();
@Module({
    imports : [
        TypeOrmModule.forFeature([Permission, PermissionUserType]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ],
    providers: [PermissionService],
    exports: [PermissionService]
})

export class PermissionModule {}