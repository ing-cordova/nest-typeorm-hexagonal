import { Test, TestingModule } from '@nestjs/testing';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { UpdateAuthUserUseCase } from './update-authuser-use-case';
import { AuthUser } from '../../domain/authuser.model';
import { AuthUserCannotUpdateException } from '../../domain/authuser-cannot-update-exception';

describe('UpdateAuthUserUseCase', () => {
    let updateAuthUserUseCase: UpdateAuthUserUseCase;
    let authUserRepository: AuthUserRepository;

    const mockAuthUserRepository = {
        updateById: jest.fn(),
        findById: jest.fn(),
    };

    const mockAuthUser: AuthUser = {
        id: 1,
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password',
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
