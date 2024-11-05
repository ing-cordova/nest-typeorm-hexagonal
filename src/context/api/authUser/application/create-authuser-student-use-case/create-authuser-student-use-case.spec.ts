import { Test, TestingModule } from '@nestjs/testing';
import { CreateAuthUserStudentUseCase } from './create-authuser-student-use-case';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { CreateAuthUserStudentUseCaseDto } from './create-authuser-student-use-case.dto';
import { UserTypeEnum } from '../../../userType/domain/user-type.enum';
import { AuthUser } from '../../domain/authuser.model';

describe('CreateAuthUserStudentUseCase', () => {
    let useCase: CreateAuthUserStudentUseCase;
    let authUserRepository: AuthUserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAuthUserStudentUseCase,
                {
                    provide: AuthUserRepository,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        useCase = module.get<CreateAuthUserStudentUseCase>(CreateAuthUserStudentUseCase);
        authUserRepository = module.get<AuthUserRepository>(AuthUserRepository);
    });

    it('should create a new auth user student', async () => {
        const dto: CreateAuthUserStudentUseCaseDto = {
            first_name: 'John',
            last_name: 'Doe',
            phone_number: '1234567890',
            email: 'john.doe@example.com',
            username: 'johndoe',
            country_id: 1,
            state_id: 1,
            accepted_terms: true,
        };

        const authUser = new AuthUser();
        authUser.user_type_id = UserTypeEnum.STUDENT;
        authUser.first_name = dto.first_name;
        authUser.last_name = dto.last_name;
        authUser.phone_number = dto.phone_number;
        authUser.email = dto.email;
        authUser.username = dto.username;
        authUser.country_id = dto.country_id;
        authUser.state_id = dto.state_id;
        authUser.password = expect.any(String);
        authUser.accepted_terms = dto.accepted_terms;
        authUser.created_at = expect.any(Date);

        jest.spyOn(authUserRepository, 'create').mockResolvedValue(Promise.resolve());

        const result = await useCase.execute(dto);

        expect(result).toEqual({ authUser });
        expect(authUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            user_type_id: UserTypeEnum.STUDENT,
            first_name: dto.first_name,
            last_name: dto.last_name,
            phone_number: dto.phone_number,
            email: dto.email,
            username: dto.username,
            country_id: dto.country_id,
            state_id: dto.state_id,
            password: expect.any(String),
            accepted_terms: dto.accepted_terms,
            created_at: expect.any(Date),
        }));
    });

    it('should throw an error if creation fails', async () => {
        const dto: CreateAuthUserStudentUseCaseDto = {
            first_name: 'John',
            last_name: 'Doe',
            phone_number: '1234567890',
            email: 'john.doe@example.com',
            username: 'johndoe',
            country_id: 1,
            state_id: 1,
            accepted_terms: true,
        };

        jest.spyOn(authUserRepository, 'create').mockRejectedValue(new Error('Creation failed'));

        await expect(useCase.execute(dto)).rejects.toThrow('Error while creating user...');
    });
});