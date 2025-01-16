import { UserProfile } from "../../domain/userprofile.model";

export interface UpdateUserProfileUseCaseDto extends Partial<UserProfile> {}