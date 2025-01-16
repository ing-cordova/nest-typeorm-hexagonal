import { Messages } from "./messages.model";

export abstract class MessagesRepository {
    abstract create(messages: Messages): Promise<void>;
    abstract findAll(): Promise<Messages[]>;
    abstract findAllWithPagination(page: number, limit: number): Promise<{ data: Messages[], total: number, nextPage: number | null, prevPage: number | null, limit: number }>;
}