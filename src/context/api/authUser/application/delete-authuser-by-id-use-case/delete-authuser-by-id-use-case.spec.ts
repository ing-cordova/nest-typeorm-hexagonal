import { DeleteAuthUserByIdUseCase } from './delete-authuser-by-id-use-case';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { DeleteAuthUserByIdUseCaseDto } from './delete-authuser-use-by-id-case.dto';

describe('DeleteAuthUserByIdUseCase', () => {
    let useCase: DeleteAuthUserByIdUseCase;
    let authUserRepository: AuthUserRepository;

    beforeEach(() => {
        // Mock del AuthUserRepository
        authUserRepository = {
            deleteById: jest.fn().mockResolvedValue(undefined), // Simulando que el deleteById siempre es exitoso
        } as unknown as AuthUserRepository;

        // Creación de la instancia del caso de uso con el repositorio mockeado
        useCase = new DeleteAuthUserByIdUseCase(authUserRepository);
    });

    it('debería llamar al método deleteById con el ID correcto', async () => {
        const dto: DeleteAuthUserByIdUseCaseDto = { id: 12345 };

        // Ejecutar el caso de uso
        await useCase.execute(dto);

        // Verificar que el método deleteById haya sido llamado con el ID correcto
        expect(authUserRepository.deleteById).toHaveBeenCalledWith(12345);
        expect(authUserRepository.deleteById).toHaveBeenCalledTimes(1);
    });

    it('debería lanzar un error si el método deleteById falla', async () => {
        const dto: DeleteAuthUserByIdUseCaseDto = { id: 12345 };

        // Simular que deleteById lanza un error
        (authUserRepository.deleteById as jest.Mock).mockRejectedValue(new Error('Error al eliminar el usuario'));

        // Verificar que el caso de uso propague el error
        await expect(useCase.execute(dto)).rejects.toThrow('Error al eliminar el usuario');
    });
});
