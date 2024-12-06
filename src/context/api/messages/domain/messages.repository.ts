import { Messages } from "./messages.model";

export abstract class MessagesRepository {
    abstract create(messages: Messages): Promise<void>;
}