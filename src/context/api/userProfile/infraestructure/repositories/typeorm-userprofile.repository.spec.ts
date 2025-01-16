import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Country } from '../../../country/domain/country.model';
import { TypeOrmUserProfileRepository } from './typeorm-userprofile.repository';
import { UserProfile } from '../../domain/userprofile.model';

describe('TypeOrmUserProfileRepository', () => {
  let userProfileRepository: TypeOrmUserProfileRepository;
  let mockRepository: jest.Mocked<Repository<UserProfile>>;  // Aquí es importante usar jest.Mocked

  beforeEach(async () => {
    // Crear un mock del repositorio de TypeORM
    const mockRepo = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        TypeOrmUserProfileRepository,
        {
          provide: getRepositoryToken(UserProfile),
          useValue: mockRepo, // Aplicamos el mock al token de TypeORM
        },
      ],
    }).compile();

    userProfileRepository = moduleRef.get<TypeOrmUserProfileRepository>(TypeOrmUserProfileRepository);
    mockRepository = moduleRef.get(getRepositoryToken(UserProfile));
  });

  it('should save an UserProfile', async () => {
    // Arrange: Crear un mock de un usuario de prueba
    const userProfile = new UserProfile();
    userProfile.username = 'testuser';
    userProfile.email = 'test@example.com';
    userProfile.password = 'password';

    // Act: Llamar al método create
    await userProfileRepository.create(userProfile);

    // Assert: Verificar que se llamó al método 'save' del repositorio
    expect(mockRepository.save).toHaveBeenCalledWith(userProfile);
  });

  it('should find an UserProfile by username', async () => {
    // Arrange: Mock de datos de usuario
    const userProfile = new UserProfile();
    userProfile.username = 'testuser';
    userProfile.email = 'testuser@example.com';
    userProfile.password = 'password';

    // Simular que findOne devuelve el usuario
    mockRepository.findOne.mockResolvedValue(userProfile);  // Aquí corregimos el uso del mock

    // Act: Llamar al método findByUsername
    const foundUser = await userProfileRepository.findByUsername('testuser');

    // Assert: Verificar que se llamó a findOne con el username correcto
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { username: 'testuser' },
      relations: ['userType', 'country', 'state']
    });
    expect(foundUser).toEqual(userProfile);
  });

  it('should return all UserProfiles', async () => {
    // Arrange: Simular que find devuelve una lista de usuarios
    const users = [
      {
        id: '00000000-0000-0000-0000-000000000001' as `${string}-${string}-${string}-${string}-${string}`,
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

    mockRepository.find.mockResolvedValue(users);  // También aquí aseguramos que el mock funcione

    // Act: Llamar al método findAll
    const allUsers = await userProfileRepository.findAll();

    // Assert: Verificar que se llamó al método 'find'
    expect(mockRepository.find).toHaveBeenCalled();
    expect(allUsers).toEqual(users);
  });
});
