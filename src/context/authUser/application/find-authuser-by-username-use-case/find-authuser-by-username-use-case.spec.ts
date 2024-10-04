import { Test, TestingModule } from '@nestjs/testing';
import { FindAuthUserByUsernameUseCase } from './find-authuser-by-username-use-case';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { AuthUser } from '../../domain/authuser.model';
import { AuthUserNotFoundException } from '../../domain/authuser-not-found.exception';

describe('FindAuthUserByUsernameUseCase', () => {
  let findAuthUserByUsernameUseCase: FindAuthUserByUsernameUseCase;
  let authUserRepository: jest.Mocked<AuthUserRepository>;

  beforeEach(async () => {
    // Crear un mock del repositorio
    const mockAuthUserRepository = {
      findByUsername: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAuthUserByUsernameUseCase,
        {
          provide: AuthUserRepository,
          useValue: mockAuthUserRepository, // Usamos el mock
        },
      ],
    }).compile();

    findAuthUserByUsernameUseCase = module.get<FindAuthUserByUsernameUseCase>(
      FindAuthUserByUsernameUseCase,
    );
    authUserRepository = module.get<AuthUserRepository>(
      AuthUserRepository,
    ) as jest.Mocked<AuthUserRepository>; // Asegurarse de que esté correctamente tipeado como un mock
  });

  it('should return an AuthUser when found by username', async () => {
    // Arrange: Definir un mock de usuario
    const mockAuthUser = new AuthUser();
    mockAuthUser.username = 'testuser';
    mockAuthUser.email = 'testuser@example.com';
    mockAuthUser.password = 'password';

    // Simular que el repositorio encuentra un usuario
    authUserRepository.findByUsername.mockResolvedValue(mockAuthUser);

    // Act: Ejecutar el caso de uso
    const result = await findAuthUserByUsernameUseCase.execute({
      username: 'testuser',
    });

    // Assert: Verificar que el resultado es el esperado
    expect(result).toEqual({ authUser: mockAuthUser });
    expect(authUserRepository.findByUsername).toHaveBeenCalledWith('testuser');
  });

  it('should throw AuthUserNotFoundException when user not found', async () => {
    // Arrange: Simular que el repositorio no encuentra un usuario
    authUserRepository.findByUsername.mockResolvedValue(null);

    // Act & Assert: Verificar que se lanza la excepción cuando no se encuentra el usuario
    await expect(
      findAuthUserByUsernameUseCase.execute({ username: 'nonexistentuser' }),
    ).rejects.toThrow(AuthUserNotFoundException);
    expect(authUserRepository.findByUsername).toHaveBeenCalledWith('nonexistentuser');
  });
});
