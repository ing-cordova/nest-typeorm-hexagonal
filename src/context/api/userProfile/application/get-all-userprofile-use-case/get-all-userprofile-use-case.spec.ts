import { Test, TestingModule } from '@nestjs/testing';
import { Country } from '../../../country/domain/country.model';
import { GetAllUserProfileUseCase } from './get-all-userprofile-use-case';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { UserProfile } from '../../domain/userprofile.model';

describe('GetAllUserProfileUseCase', () => {
  let getAllUserProfileUseCase: GetAllUserProfileUseCase;
  let userPrfileRepository: jest.Mocked<UserProfileRepository>;

  beforeEach(async () => {
    // Crear un mock del repositorio
    const mockAuthUserRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUserProfileUseCase,
        {
          provide: UserProfileRepository,
          useValue: mockAuthUserRepository, // Usamos el mock
        },
      ],
    }).compile();

    getAllUserProfileUseCase = module.get<GetAllUserProfileUseCase>(
      GetAllUserProfileUseCase,
    );
    userPrfileRepository = module.get<UserProfileRepository>(
      UserProfileRepository,
    ) as jest.Mocked<UserProfileRepository>; // Asegurarse de que esté correctamente tipeado como un mock
  });

  it('should return all auth users', async () => {
    // Arrange: Definir un mock de usuarios
    const mockUserProfiles: UserProfile[] = [
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
        is_temporal_password: false,
        accepted_terms: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
    ];

    // Simular que el repositorio devuelve todos los usuarios
    userPrfileRepository.findAll.mockResolvedValue(mockUserProfiles);

    // Act: Ejecutar el caso de uso
    const result = await getAllUserProfileUseCase.execute();

    // Assert: Verificar que el resultado es el esperado
    expect(result).toEqual({ userProfiles: mockUserProfiles });
    expect(userPrfileRepository.findAll).toHaveBeenCalled();
  });
});
