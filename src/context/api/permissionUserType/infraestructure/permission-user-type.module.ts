import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PermissionUserType } from "../domain/permission-user-type.model";
import { PermissionService } from "src/context/services/permissions.service";
import { PermissionsGuard } from "src/context/guards/permissions.guard";

const config = new ConfigService();
@Module({
    imports : [
        TypeOrmModule.forFeature([PermissionUserType]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ],
    providers: [PermissionService, PermissionsGuard],
    exports: [PermissionService]
})

export class PermissionUserTypeModule {}