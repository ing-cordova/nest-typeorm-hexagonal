import { AuthUser, RequestAuthUser } from './authuser.model';

export abstract class AuthUserRepository {
  abstract create(authUser: AuthUser): Promise<void>;
  abstract findByUsername(username: string): Promise<AuthUser | null>;
  abstract findAll(): Promise<AuthUser[]>;
  abstract deleteById(id: number): Promise<void>;
  abstract updateById(id: number, authUser: RequestAuthUser): Promise<AuthUser>;
  abstract login(email: string, password: string): Promise<AuthUser | null>;
}
