import { Test, TestingModule } from '@nestjs/testing';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { UpdateAuthUserUseCase } from './update-authuser-use-case';
import { AuthUser } from '../../domain/authuser.model';
import { AuthUserCannotUpdateException } from '../../domain/authuser-cannot-update-exception';
import { Country } from '../../../country/domain/country.model';

describe('UpdateAuthUserUseCase', () => {
    let updateAuthUserUseCase: UpdateAuthUserUseCase;
    let authUserRepository: AuthUserRepository;

    const mockAuthUserRepository = {
        updateById: jest.fn(),
        findById: jest.fn(),
    };

    const mockAuthUser: AuthUser = {
        id: 1,
        user_type_id: 1,
        userType: { id: 1, name: 'userType', description: 'user type', created_at: new Date(), updated_at: new Date(), deleted_at: new Date() },
        first_name: 'test',
        second_name: 'test',
        last_name: 'test',
        second_last_name: 'test',
        phone_number: 'test',
        username: 'testuser',
        email: 'testuser@example.com',
        email_verified_at: new Date(),
        country_id: 1,
        country: { id: 1, name: 'country', iso2: 'test', iso3: 'test', phone_code: 'test', region: 'test', currency: 'test', created_at: new Date(), updated_at: new Date(), deleted_at: new Date() },
        state_id: 1,
        state: {
            id: 1, name: 'state', created_at: new Date(), updated_at: new Date(), deleted_at: new Date(),
            state_code: 'test',
            country_id: 1,
            country: new Country()
        },
        address: 'test',
        password: 'password',
        accepted_terms: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
        // otros campos necesarios para AuthUser
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAuthUserUseCase,
                {
                    provide: AuthUserRepository,
                    useValue: mockAuthUserRepository,
                },
            ],
        }).compile();

        updateAuthUserUseCase = module.get<UpdateAuthUserUseCase>(UpdateAuthUserUseCase);
        authUserRepository = module.get<AuthUserRepository>(AuthUserRepository);
    });

    it('debe actualizar un usuario autenticado exitosamente', async () => {
        // Simulamos que el repositorio devuelve el usuario actualizado
        mockAuthUserRepository.updateById.mockResolvedValue(mockAuthUser);

        const params = { id: 1 };
        const reqBody = { username: 'newUsername', email: 'newEmail@example.com' };

        const result = await updateAuthUserUseCase.execute(params, reqBody);

        // Asegúrate de que el repositorio se haya llamado con los valores correctos
        expect(mockAuthUserRepository.updateById).toHaveBeenCalledWith(1, reqBody);
        expect(result.authUser).toEqual(mockAuthUser);
    });

    it('debe lanzar una excepción si no se puede actualizar el usuario', async () => {
        // Simulamos que el repositorio lanza un error
        mockAuthUserRepository.updateById.mockRejectedValue(new Error());

        const params = { id: 1 };
        const reqBody = { username: 'newUsername', email: 'newEmail@example.com' };

        await expect(updateAuthUserUseCase.execute(params, reqBody)).rejects.toThrow(AuthUserCannotUpdateException);

        // Verificamos que el repositorio haya sido llamado antes de lanzar la excepción
        expect(mockAuthUserRepository.updateById).toHaveBeenCalledWith(1, reqBody);
    });
});
