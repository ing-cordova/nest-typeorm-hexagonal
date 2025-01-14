import { Module } from "@nestjs/common";
import { FindAllRegionUseCase } from "../application/find-all-region-use-case/find-all-region-use-case";
import { TypeOrmRegionRepository } from "./repositories/typeorm-region.repository";
import { Region } from "../domain/region.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/context/services/jwt/jwt.strategy";
import { PermissionModule } from "../../permission/infraestructure/permission.module";
import { FindAllRegionController } from "./http-api/find-all-region-controller/find-all-region-controller";
import { RegionRepository } from "../domain/region.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

const config = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forFeature([Region]),
    JwtModule.register({
      secret: config.get<string>("TOKEN_SECRET"),
      signOptions: { expiresIn: config.get<string>("TOKEN_EXPIRATION") },
    }),
    PermissionModule,
  ],
  controllers: [FindAllRegionController],
  providers: [
    FindAllRegionUseCase,
    TypeOrmRegionRepository,
    {
      provide: RegionRepository,
      useClass: TypeOrmRegionRepository,
    },
    JwtStrategy,
  ],
  exports: [FindAllRegionUseCase],
})
export class RegionModule {}
