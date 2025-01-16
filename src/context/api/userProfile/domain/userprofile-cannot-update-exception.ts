import { UUID } from "crypto";

export class UserProfileCannotUpdateException extends Error {
    constructor(public readonly id: UUID) {
        super(`UserProfile with username ${id} cannot be updated`);
    }
}