import { BadRequestException } from "@nestjs/common";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { MessagesRepository } from "../../domain/messages.repository";
import { CreateNewMessageUseCaseDto } from "./create-new-message-use-case.dto";
import { Messages } from "../../domain/messages.model";

@Injectable()
export class CreateNewMessageUseCase {
    constructor(private readonly messagesRepository: MessagesRepository) { }

    async execute(data: CreateNewMessageUseCaseDto): Promise<void> {
        try {
            const message = new Messages();
            message.full_name = data.full_name;
            message.email = data.email;
            message.phone_number = data.phone_number;
            message.message = data.message;
            await this.messagesRepository.create(message);
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}