export interface CreateAuthUserStudentUseCaseDto {
    first_name: string;
    last_name: string;
    username: string;
    phone_number: string;
    email: string;
    country_id: number;
    state_id: number;
    address: string;
    accepted_terms: boolean;
} 