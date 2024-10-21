import { Test, TestingModule } from '@nestjs/testing';
import { GetAllAuthUserUseCase } from './get-all-authuser-use-case';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { AuthUser } from '../../domain/authuser.model';

describe('GetAllAuthUserUseCase', () => {
  let getAllAuthUserUseCase: GetAllAuthUserUseCase;
  let authUserRepository: jest.Mocked<AuthUserRepository>;

  beforeEach(async () => {
    // Crear un mock del repositorio
    const mockAuthUserRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllAuthUserUseCase,
        {
          provide: AuthUserRepository,
          useValue: mockAuthUserRepository, // Usamos el mock
        },
      ],
    }).compile();

    getAllAuthUserUseCase = module.get<GetAllAuthUserUseCase>(
      GetAllAuthUserUseCase,
    );
    authUserRepository = module.get<AuthUserRepository>(
      AuthUserRepository,
    ) as jest.Mocked<AuthUserRepository>; // Asegurarse de que esté correctamente tipeado como un mock
  });

  it('should return all auth users', async () => {
    // Arrange: Definir un mock de usuarios
    const mockAuthUsers: AuthUser[] = [
      { id: 1, username: 'user1', email: 'user1@example.com', password: 'password' },
      { id: 2, username: 'user2', email: 'user2@example.com', password: 'password' },
    ];

    // Simular que el repositorio devuelve todos los usuarios
    authUserRepository.findAll.mockResolvedValue(mockAuthUsers);

    // Act: Ejecutar el caso de uso
    const result = await getAllAuthUserUseCase.execute();

    // Assert: Verificar que el resultado es el esperado
    expect(result).toEqual({ authUsers: mockAuthUsers });
    expect(authUserRepository.findAll).toHaveBeenCalled();
  });
});
