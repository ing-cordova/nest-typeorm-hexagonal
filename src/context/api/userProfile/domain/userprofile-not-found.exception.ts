export class UserProfileNotFoundException extends Error {
  constructor(public readonly username: string) {
    super(`UserProfile with username ${username} not found`);
  }
}
