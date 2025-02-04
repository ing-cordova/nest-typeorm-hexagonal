import { UUID } from 'crypto';
import { UserProfile, RequestUserProfile } from './userprofile.model';

export abstract class UserProfileRepository {
  abstract create(userProfile: UserProfile): Promise<void>;
  abstract findByUsername(username: string): Promise<UserProfile | null>;
  abstract findAll(): Promise<UserProfile[]>;
  abstract findAllWithPagination(page: number, limit: number): Promise<{ data: UserProfile[], total: number, nextPage: number | null, prevPage: number | null, limit: number }>;
  abstract deleteById(id: number): Promise<void>;
  abstract softDeleteById(id: number): Promise<void>;
  abstract updateById(id: UUID, userProfile: Partial<UserProfile>): Promise<UserProfile>;
  abstract login(email: string, password: string): Promise<UserProfile | null>;
  abstract changePassword(username: string, password: string): Promise<void>;
}
