import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "src/context/services/jwt/jwt.strategy";
import { SubCategory } from "../domain/subcategory.model";
import { JwtModule } from "@nestjs/jwt";
import { FindByCategoryIdController } from "./http-api/find-by-category-id.controller";
import { FindByCategoryIdUseCase } from "../application/find-by-category-id-use-case/find-by-category-id-use-case";
import { TypeormSubCategoryRepository } from "./repositories/typeorm-subcategory.repository";
import { SubCategoryRepository } from "../domain/subcategory.repository";
import { ConfigService } from "@nestjs/config";

const config = new ConfigService();

@Module({
    imports: [
        TypeOrmModule.forFeature([SubCategory]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ],
    controllers: [
        FindByCategoryIdController
    ],
    providers: [
        FindByCategoryIdUseCase,
        TypeormSubCategoryRepository,
        {
            provide: SubCategoryRepository,
            useClass: TypeormSubCategoryRepository
        },
        JwtStrategy,
    ],
    exports: [FindByCategoryIdUseCase]
})

export class SubCategoryModule { }