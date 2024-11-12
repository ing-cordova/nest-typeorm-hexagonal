export class UserProfileCannotUpdateException extends Error {
    constructor(public readonly id: number) {
        super(`UserProfile with username ${id} cannot be updated`);
    }
}