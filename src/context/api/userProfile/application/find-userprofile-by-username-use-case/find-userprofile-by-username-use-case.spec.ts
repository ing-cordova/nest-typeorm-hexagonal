import { Test, TestingModule } from '@nestjs/testing';
import { FindUserProfileByUsernameUseCase } from './find-userprofile-by-username-use-case';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { UserProfile } from '../../domain/userprofile.model';
import { UserProfileNotFoundException } from '../../domain/userprofile-not-found.exception';

describe('FindUserProfileByUsernameUseCase', () => {
  let findUserProfileByUsernameUseCase: FindUserProfileByUsernameUseCase;
  let userProfileRepository: jest.Mocked<UserProfileRepository>;

  beforeEach(async () => {
    // Crear un mock del repositorio
    const mockUserProfileRepository = {
      findByUsername: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserProfileByUsernameUseCase,
        {
          provide: UserProfileRepository,
          useValue: mockUserProfileRepository, // Usamos el mock
        },
      ],
    }).compile();

    findUserProfileByUsernameUseCase = module.get<FindUserProfileByUsernameUseCase>(
      FindUserProfileByUsernameUseCase,
    );
    userProfileRepository = module.get<UserProfileRepository>(
      UserProfileRepository,
    ) as jest.Mocked<UserProfileRepository>; // Asegurarse de que esté correctamente tipeado como un mock
  });

  it('should return an UserProfile when found by username', async () => {
    // Arrange: Definir un mock de usuario
    const mockUserProfile = new UserProfile();
    mockUserProfile.username = 'testuser';
    mockUserProfile.email = 'testuser@example.com';
    mockUserProfile.password = 'password';

    // Simular que el repositorio encuentra un usuario
    userProfileRepository.findByUsername.mockResolvedValue(mockUserProfile);

    // Act: Ejecutar el caso de uso
    const result = await findUserProfileByUsernameUseCase.execute({
      username: 'testuser',
    });

    // Assert: Verificar que el resultado es el esperado
    expect(result).toEqual({ userProfile: mockUserProfile });
    expect(userProfileRepository.findByUsername).toHaveBeenCalledWith('testuser');
  });

  it('should throw UserProfileNotFoundException when user not found', async () => {
    // Arrange: Simular que el repositorio no encuentra un usuario
    userProfileRepository.findByUsername.mockResolvedValue(null);

    // Act & Assert: Verificar que se lanza la excepción cuando no se encuentra el usuario
    await expect(
      findUserProfileByUsernameUseCase.execute({ username: 'nonexistentuser' }),
    ).rejects.toThrow(UserProfileNotFoundException);
    expect(userProfileRepository.findByUsername).toHaveBeenCalledWith('nonexistentuser');
  });
});
