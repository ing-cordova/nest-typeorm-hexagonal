import { UUID } from "crypto";

export interface GenerateUserProfileUseCaseDto {
    user_type_id: UUID;
    first_name: string;
    last_name: string;
    username: string;
    phone_number: string;
    email: string;
    country_id: number;
    state_id: number;
} 