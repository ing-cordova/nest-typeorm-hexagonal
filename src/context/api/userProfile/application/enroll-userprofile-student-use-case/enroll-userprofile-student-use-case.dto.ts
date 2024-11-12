export interface EnrollUserProfileStudentUseCaseDto {
    first_name: string;
    last_name: string;
    username: string;
    phone_number: string;
    email: string;
    country_id: number;
    state_id: number;
    accepted_terms: boolean;
} 