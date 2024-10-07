export class AuthUserCannotUpdateException extends Error {
    constructor(public readonly id: number) {
        super(`AuthUser with username ${id} cannot be updated`);
    }
}