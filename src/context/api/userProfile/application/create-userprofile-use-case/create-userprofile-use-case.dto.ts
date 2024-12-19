import { UUID } from "crypto";

export interface CreateUserProfileUseCaseDto {
  user_type_id: UUID;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  country_id: number;
}
