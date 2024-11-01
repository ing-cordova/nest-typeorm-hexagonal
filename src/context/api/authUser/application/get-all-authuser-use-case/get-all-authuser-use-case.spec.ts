import { Test, TestingModule } from '@nestjs/testing';
import { GetAllAuthUserUseCase } from './get-all-authuser-use-case';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { AuthUser } from '../../domain/authuser.model';
import { Country } from '../../../country/domain/country.model';

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
      {
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
      },
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
