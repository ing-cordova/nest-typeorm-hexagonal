import { Module } from "@nestjs/common";
import { FindAllSubRegionUseCase } from "../application/find-all-sub-region-use-case/find-all-sub-region-use-case";
import { TypeOrmSubRegionRepository } from "./repositories/typeorm-sub-region.repository";
import { SubRegion } from "../domain/sub-region.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/context/services/jwt/jwt.strategy";
import { PermissionModule } from "../../permission/infraestructure/permission.module";
import { FindAllSubRegionController } from "./http-api/find-all-sub-region-controller/find-all-sub-region-controller";
import { SubRegionRepository } from "../domain/sub-region.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

const config = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forFeature([SubRegion]),
    JwtModule.register({
      secret: config.get<string>("TOKEN_SECRET"),
      signOptions: { expiresIn: config.get<string>("TOKEN_EXPIRATION") },
    }),
    PermissionModule,
  ],
  controllers: [FindAllSubRegionController],
  providers: [
    FindAllSubRegionUseCase,
    TypeOrmSubRegionRepository,
    {
      provide: SubRegionRepository,
      useClass: TypeOrmSubRegionRepository,
    },
    JwtStrategy,
  ],
  exports: [FindAllSubRegionUseCase],
})
export class SubRegionModule {}
