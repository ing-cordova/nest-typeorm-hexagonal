import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../domain/category.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { GetAllCategoriesController } from "./http-api/get-all-categories-http.controller";
import { GetAllCategoriesUseCase } from "../application/get-all-categories-use-case/get-all-categories-use-case";
import { TypeormCategoryRepository } from "./repositories/typeorm-category.repository";
import { CategoryRepository } from "../domain/category.repository";
import { JwtStrategy } from "src/context/services/jwt/jwt.strategy";

const config = new ConfigService();

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        })
    ],
    controllers: [
        GetAllCategoriesController
    ],
    providers: [
        GetAllCategoriesUseCase,
        TypeormCategoryRepository,
        {
            provide: CategoryRepository,
            useClass: TypeormCategoryRepository
        },
        JwtStrategy,
    ],
    exports: [GetAllCategoriesUseCase]
})

export class CategoryModule { }