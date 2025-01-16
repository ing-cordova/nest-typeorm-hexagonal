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

    async findAll(): Promise<Messages[]> {
        return await this.repository.find();
    }

    async findAllWithPagination(page: number, limit: number): Promise<{ data: Messages[], total: number, nextPage: number | null, prevPage: number | null, limit: number }> {
        const [messages, total] = await this.repository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        const nextPage = (page * limit) < total ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;
        return { data: messages, total, nextPage, prevPage, limit };
    }
}