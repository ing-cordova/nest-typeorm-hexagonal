import { PaginationService } from "../../../../services/pagination/pagination.service";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { Messages } from "../../domain/messages.model";
import { MessagesRepository } from "../../domain/messages.repository";

@Injectable()
export class ViewAllMessagesUseCase {
    constructor(private readonly messagesRepository: MessagesRepository, private readonly paginationService: PaginationService) { }

    async execute(page: number, pageSize: number): Promise<{ data: Messages[], total: number, nextPage: number | null, prevPage: number | null, limit: number }> {
        const { data, total } = await this.messagesRepository.findAllWithPagination(page, pageSize);
        return this.paginationService.paginate(data, total, page, pageSize);
    }
}