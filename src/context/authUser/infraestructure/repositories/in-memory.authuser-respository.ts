import { AuthUser, PrimitiveAuthUser } from '../../domain/authuser.model';
import { AuthUserRepository } from '../../domain/authuser.repository';

export class InMemoryAuthUserRepository extends AuthUserRepository {
  private authUsers: PrimitiveAuthUser[] = [];

  async create(authUser: AuthUser): Promise<void> {
    this.authUsers.push(authUser.toValue());
  }

  async findByUsername(username: string): Promise<AuthUser | null> {
    const authUser = this.authUsers.find(
      (authUser) => authUser.username === username,
    );

    return authUser ? new AuthUser(authUser) : null;
  }

  async findAll(): Promise<AuthUser[]> {
    return this.authUsers.map((authUser) => new AuthUser(authUser));
  }
}
