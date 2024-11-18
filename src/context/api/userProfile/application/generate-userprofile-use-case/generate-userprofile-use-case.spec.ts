import { Test, TestingModule } from '@nestjs/testing';
import { UserTypeEnum } from '../../../userType/domain/user-type.enum';
import { HttpException } from '@nestjs/common';
import { encryptPassword } from '../../../../services/password-service';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { UserProfile } from '../../domain/userprofile.model';
import { GenerateUserProfileUseCase } from './generate-userprofile-use-case';
import { GenerateUserProfileUseCaseDto } from './generate-userprofile-use-case.dto';

// Añadimos esta línea para simular el módulo completo donde se encuentra `encryptPassword`.
jest.mock('../../../../services/password-service', () => ({
    encryptPassword: jest.fn(), // Simulamos `encryptPassword`
}));

describe('GenerateUserProfileUseCase', () => {
    let useCase: GenerateUserProfileUseCase;
    let userProfileRepository: UserProfileRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GenerateUserProfileUseCase,
                {
                    provide: UserProfileRepository,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        useCase = module.get<GenerateUserProfileUseCase>(GenerateUserProfileUseCase);
        userProfileRepository = module.get<UserProfileRepository>(UserProfileRepository);

        // Simulamos `console.log` para evitar la salida en el test.
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        // Restauramos `console.log` a su implementación original al finalizar el test.
        jest.restoreAllMocks();
    });

    it('should create a new user profile student', async () => {
        const dto: GenerateUserProfileUseCaseDto = {
            first_name: 'John',
            last_name: 'Doe',
            phone_number: '1234567890',
            email: 'john.doe@example.com',
            username: 'johndoe',
            country_id: 1,
            state_id: 1,
        };

        const passwordGenerated = 'StaticPassword123';
        const encryptedPassword = 'EncryptedStaticPassword';

        jest.spyOn(useCase, 'generatePassword').mockReturnValue(passwordGenerated);
        (encryptPassword as jest.Mock).mockReturnValue(encryptedPassword);

        const userProfile = new UserProfile();
        userProfile.user_type_id = UserTypeEnum.STUDENT;
        userProfile.first_name = dto.first_name;
        userProfile.last_name = dto.last_name;
        userProfile.phone_number = dto.phone_number;
        userProfile.email = dto.email;
        userProfile.username = dto.username;
        userProfile.country_id = dto.country_id;
        userProfile.state_id = dto.state_id;
        userProfile.password = encryptedPassword;
        userProfile.created_at = expect.any(Date);

        jest.spyOn(userProfileRepository, 'create').mockResolvedValue(undefined);

        const result = await useCase.execute(dto);

        expect(result).toEqual({ userProfile });
        expect(userProfileRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            user_type_id: UserTypeEnum.STUDENT,
            first_name: dto.first_name,
            last_name: dto.last_name,
            phone_number: dto.phone_number,
            email: dto.email,
            username: dto.username,
            country_id: dto.country_id,
            state_id: dto.state_id,
            password: encryptedPassword,
            created_at: expect.any(Date),
        }));
    });

    it('should throw an error if creation fails', async () => {
        const dto: GenerateUserProfileUseCaseDto = {
            first_name: 'John',
            last_name: 'Doe',
            phone_number: '1234567890',
            email: 'john.doe@example.com',
            username: 'johndoe',
            country_id: 1,
            state_id: 1,
        };

        jest.spyOn(userProfileRepository, 'create').mockRejectedValue(new Error('Creation failed'));

        await expect(useCase.execute(dto)).rejects.toThrow(HttpException);
        await expect(useCase.execute(dto)).rejects.toThrow('Creation failed');
    });
});
