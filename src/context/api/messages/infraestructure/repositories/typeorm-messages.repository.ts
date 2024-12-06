import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { MessagesRepository } from "../../domain/messages.repository";
import { Messages } from "../../domain/messages.model";
import { Repository } from "typeorm";

@Injectable()
export class TypeOrmMessagesRepository extends MessagesRepository { 
    constructor(
        @InjectRepository(Messages)
        private readonly repository: Repository<Messages>,
    ) {
        super();
    }

    async create(message: Messages): Promise<void> {
        await this.repository.save(message);
    }
}