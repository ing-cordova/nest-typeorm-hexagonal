import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Messages } from "../domain/messages.model";
import { JwtModule } from "@nestjs/jwt";
import { CreateNewMessageHttpController } from "./http-api/create-new-message-http/create-new-message-http.controller";
import { CreateNewMessageUseCase } from "../application/create-new-message-use-case/create-new-message-use-case";
import { TypeOrmMessagesRepository } from "./repositories/typeorm-messages.repository";
import { MessagesRepository } from "../domain/messages.repository";
import { JwtStrategy } from "src/context/services/jwt/jwt.strategy";
import { ViewAllMessagesHttpController } from "./http-api/view-all-messages-http/view-all-messages.controller";
import { ViewAllMessagesUseCase } from "../application/view-all-messages-use-case/view-all-messages-use-case";
import { PermissionModule } from "../../permission/infraestructure/permission.module";
import { PaginationService } from "src/context/services/pagination/pagination.service";

const config = new ConfigService();
@Module({
    imports: [
        TypeOrmModule.forFeature([Messages]),
        JwtModule.register({
            secret: config.get<string>('TOKEN_SECRET'),
            signOptions: { expiresIn: config.get<string>('TOKEN_EXPIRATION') },
        }),
        PermissionModule
    ],
    controllers: [
        CreateNewMessageHttpController,
        ViewAllMessagesHttpController
    ],
    providers: [
        CreateNewMessageUseCase,
        ViewAllMessagesUseCase,
        TypeOrmMessagesRepository,
        {
            provide: MessagesRepository,
            useClass: TypeOrmMessagesRepository
        },
        JwtStrategy,
        PaginationService
    ],
    exports: [CreateNewMessageUseCase, ViewAllMessagesUseCase]
})

export class MessagesModule { }