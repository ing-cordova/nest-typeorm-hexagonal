import { Test, TestingModule } from '@nestjs/testing';
import { Country } from '../../../country/domain/country.model';
import { GetAllUserProfileUseCase } from './get-all-userprofile-use-case';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { UserProfile } from '../../domain/userprofile.model';
import { PaginationService } from '../../../../services/pagination/pagination.service';

describe('GetAllUserProfileUseCase', () => {
  let getAllUserProfileUseCase: GetAllUserProfileUseCase;
  let userProfileRepository: jest.Mocked<UserProfileRepository>;
  let paginationService: jest.Mocked<PaginationService>;

  beforeEach(async () => {
    // Crear un mock del repositorio y del servicio de paginación
    const mockUserProfileRepository = {
      findAllWithPagination: jest.fn(),
    };

    const mockPaginationService = {
      paginate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUserProfileUseCase,
        {
          provide: UserProfileRepository,
          useValue: mockUserProfileRepository, // Usamos el mock
        },
        {
          provide: PaginationService,
          useValue: mockPaginationService, // Usamos el mock
        },
      ],
    }).compile();

    getAllUserProfileUseCase = module.get<GetAllUserProfileUseCase>(
      GetAllUserProfileUseCase,
    );
    userProfileRepository = module.get<UserProfileRepository>(
      UserProfileRepository,
    ) as jest.Mocked<UserProfileRepository>; // Asegurarse de que esté correctamente tipeado como un mock
    paginationService = module.get<PaginationService>(
      PaginationService,
    ) as jest.Mocked<PaginationService>; // Asegurarse de que esté correctamente tipeado como un mock
  });

  it('should return all auth users with pagination', async () => {
    // Arrange: Definir un mock de usuarios
    const mockUserProfiles: UserProfile[] = [
      {
        id: '00000000-0000-0000-0000-000000000001',
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
        address: 'test address',
        password: 'testpassword',
        is_temporal_password: false,
        accepted_terms: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      }
    ];

    const mockPaginationResult = {
      data: mockUserProfiles,
      total: 1,
      nextPage: null,
      prevPage: null,
      limit: 10,
    };

    userProfileRepository.findAllWithPagination.mockResolvedValue({ data: mockUserProfiles, total: 1, nextPage: null, prevPage: null, limit: 10 });
    paginationService.paginate.mockReturnValue(mockPaginationResult);

    // Act
    const result = await getAllUserProfileUseCase.execute(1, 10);

    // Assert
    expect(result).toEqual(mockPaginationResult);
    expect(userProfileRepository.findAllWithPagination).toHaveBeenCalledWith(1, 10);
    expect(paginationService.paginate).toHaveBeenCalledWith(mockUserProfiles, 1, 1, 10);
  });
});
