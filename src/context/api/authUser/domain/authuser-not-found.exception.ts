export class AuthUserNotFoundException extends Error {
  constructor(public readonly username: string) {
    super(`AuthUser with username ${username} not found`);
  }
}
