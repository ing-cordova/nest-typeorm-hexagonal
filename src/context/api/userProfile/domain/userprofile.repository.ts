import { UserProfile, RequestUserProfile } from './userprofile.model';

export abstract class UserProfileRepository {
  abstract create(userProfile: UserProfile): Promise<void>;
  abstract findByUsername(username: string): Promise<UserProfile | null>;
  abstract findAll(): Promise<UserProfile[]>;
  abstract deleteById(id: number): Promise<void>;
  abstract softDeleteById(id: number): Promise<void>;
  abstract updateById(id: number, userProfile: Partial<UserProfile>): Promise<UserProfile>;
  abstract login(email: string, password: string): Promise<UserProfile | null>;
  abstract changePassword(username: string, password: string): Promise<void>;
}
