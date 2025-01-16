import { UserProfileRepository } from "../../domain/userprofile.repository";
import { DeleteUserProfileByIdUseCase } from "./delete-userprofile-by-id-use-case";
import { DeleteUserProfileByIdUseCaseDto } from "./delete-userprofile-use-by-id-case.dto";

describe('DeleteUserProfileByIdUseCase', () => {
    let useCase: DeleteUserProfileByIdUseCase;
    let userProfileRepository: UserProfileRepository;

    beforeEach(() => {
        // Mock del UserProfileRepository
        userProfileRepository = {
            softDeleteById: jest.fn().mockResolvedValue(undefined), // Simulando que el softDeleteById siempre es exitoso
        } as unknown as UserProfileRepository;

        // Creación de la instancia del caso de uso con el repositorio mockeado
        useCase = new DeleteUserProfileByIdUseCase(userProfileRepository);
    });

    it('debería llamar al método softDeleteById con el ID correcto', async () => {
        const dto: DeleteUserProfileByIdUseCaseDto = { id: 12345 };

        // Ejecutar el caso de uso
        await useCase.execute(dto);

        // Verificar que el método softDeleteById haya sido llamado con el ID correcto
        expect(userProfileRepository.softDeleteById).toHaveBeenCalledWith(12345);
        expect(userProfileRepository.softDeleteById).toHaveBeenCalledTimes(1);
    });

    it('debería lanzar un error si el método softDeleteById falla', async () => {
        const dto: DeleteUserProfileByIdUseCaseDto = { id: 12345 };

        // Simular que softDeleteById lanza un error
        (userProfileRepository.softDeleteById as jest.Mock).mockRejectedValue(new Error('Error al eliminar el usuario'));

        // Verificar que el caso de uso propague el error
        await expect(useCase.execute(dto)).rejects.toThrow('Error al eliminar el usuario');
    });
});
