import { Test, TestingModule } from '@nestjs/testing';
import { EnrollAuthUserStudentUseCase } from './enroll-authuser-student-use-case';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { EnrollAuthUserStudentUseCaseDto } from './enroll-authuser-student-use-case.dto';
import { AuthUser } from '../../domain/authuser.model';
import { UserTypeEnum } from '../../../userType/domain/user-type.enum';
import { HttpException } from '@nestjs/common';
import { encryptPassword } from '../../../../services/password-service';

// Añadimos esta línea para simular el módulo completo donde se encuentra `encryptPassword`.
jest.mock('../../../../services/password-service', () => ({
    encryptPassword: jest.fn(), // Simulamos `encryptPassword`
}));

describe('EnrollAuthUserStudentUseCase', () => {
    let useCase: EnrollAuthUserStudentUseCase;
    let authUserRepository: AuthUserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EnrollAuthUserStudentUseCase,
                {
                    provide: AuthUserRepository,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        useCase = module.get<EnrollAuthUserStudentUseCase>(EnrollAuthUserStudentUseCase);
        authUserRepository = module.get<AuthUserRepository>(AuthUserRepository);

        // Simulamos `console.log` para evitar la salida en el test.
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restauramos `console.log` a su implementación original al finalizar el test.
        jest.restoreAllMocks();
    });

    it('should create a new auth user student', async () => {
        const dto: EnrollAuthUserStudentUseCaseDto = {
            first_name: 'John',
            last_name: 'Doe',
            phone_number: '1234567890',
            email: 'john.doe@example.com',
            username: 'johndoe',
            country_id: 1,
            state_id: 1,
            accepted_terms: true,
        };

        const passwordGenerated = 'StaticPassword123';
        const encryptedPassword = 'EncryptedStaticPassword';

        jest.spyOn(useCase, 'generatePassword').mockReturnValue(passwordGenerated);
        (encryptPassword as jest.Mock).mockReturnValue(encryptedPassword);

        const authUser = new AuthUser();
        authUser.user_type_id = UserTypeEnum.STUDENT;
        authUser.first_name = dto.first_name;
        authUser.last_name = dto.last_name;
        authUser.phone_number = dto.phone_number;
        authUser.email = dto.email;
        authUser.username = dto.username;
        authUser.country_id = dto.country_id;
        authUser.state_id = dto.state_id;
        authUser.password = encryptedPassword;
        authUser.accepted_terms = dto.accepted_terms;
        authUser.created_at = expect.any(Date);

        jest.spyOn(authUserRepository, 'create').mockResolvedValue(undefined);

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
            password: encryptedPassword,
            accepted_terms: dto.accepted_terms,
            created_at: expect.any(Date),
        }));
    });

    it('should throw an error if terms are not accepted', async () => {
        const dto: EnrollAuthUserStudentUseCaseDto = {
            first_name: 'John',
            last_name: 'Doe',
            phone_number: '1234567890',
            email: 'john.doe@example.com',
            username: 'johndoe',
            country_id: 1,
            state_id: 1,
            accepted_terms: false,
        };

        await expect(useCase.execute(dto)).rejects.toThrow(HttpException);
        await expect(useCase.execute(dto)).rejects.toThrow('You must accept the terms and conditions');
    });

    it('should throw an error if creation fails', async () => {
        const dto: EnrollAuthUserStudentUseCaseDto = {
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

        await expect(useCase.execute(dto)).rejects.toThrow(HttpException);
        await expect(useCase.execute(dto)).rejects.toThrow('Creation failed');
    });
});
