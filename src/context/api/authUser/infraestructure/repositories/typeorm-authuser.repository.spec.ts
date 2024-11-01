import { Test } from '@nestjs/testing';
import { TypeOrmAuthUserRepository } from './typeorm-authuser.repository';
import { AuthUser } from '../../domain/authuser.model';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Country } from '../../../country/domain/country.model';

describe('TypeOrmAuthUserRepository', () => {
  let authUserRepository: TypeOrmAuthUserRepository;
  let mockRepository: jest.Mocked<Repository<AuthUser>>;  // Aquí es importante usar jest.Mocked

  beforeEach(async () => {
    // Crear un mock del repositorio de TypeORM
    const mockRepo = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        TypeOrmAuthUserRepository,
        {
          provide: getRepositoryToken(AuthUser),
          useValue: mockRepo, // Aplicamos el mock al token de TypeORM
        },
      ],
    }).compile();

    authUserRepository = moduleRef.get<TypeOrmAuthUserRepository>(TypeOrmAuthUserRepository);
    mockRepository = moduleRef.get(getRepositoryToken(AuthUser));
  });

  it('should save an AuthUser', async () => {
    // Arrange: Crear un mock de un usuario de prueba
    const authUser = new AuthUser();
    authUser.username = 'testuser';
    authUser.email = 'test@example.com';
    authUser.password = 'password';

    // Act: Llamar al método create
    await authUserRepository.create(authUser);

    // Assert: Verificar que se llamó al método 'save' del repositorio
    expect(mockRepository.save).toHaveBeenCalledWith(authUser);
  });

  it('should find an AuthUser by username', async () => {
    // Arrange: Mock de datos de usuario
    const authUser = new AuthUser();
    authUser.username = 'testuser';
    authUser.email = 'testuser@example.com';
    authUser.password = 'password';

    // Simular que findOne devuelve el usuario
    mockRepository.findOne.mockResolvedValue(authUser);  // Aquí corregimos el uso del mock

    // Act: Llamar al método findByUsername
    const foundUser = await authUserRepository.findByUsername('testuser');

    // Assert: Verificar que se llamó a findOne con el username correcto
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
    expect(foundUser).toEqual(authUser);
  });

  it('should return all AuthUsers', async () => {
    // Arrange: Simular que find devuelve una lista de usuarios
    const users = [
      { 
        id: 1,
        userType: { id: 1, name: 'userType', description: 'user type', created_at: new Date(), updated_at: new Date(), deleted_at: new Date() },
        first_name: 'test',
        second_name: 'test',
        last_name: 'test',
        second_last_name: 'test',
        phone_number: 'test',
        username: 'testuser',
        email: 'testuser@example.com',
        email_verified_at: new Date(),
        country: { id: 1, name: 'country', iso2: 'test', iso3: 'test', phone_code: 'test', flag: 'test', created_at: new Date(), updated_at: new Date(), deleted_at: new Date() },
        city: {
            id: 1, name: 'city', created_at: new Date(), updated_at: new Date(), deleted_at: new Date(),
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

    mockRepository.find.mockResolvedValue(users);  // También aquí aseguramos que el mock funcione

    // Act: Llamar al método findAll
    const allUsers = await authUserRepository.findAll();

    // Assert: Verificar que se llamó al método 'find'
    expect(mockRepository.find).toHaveBeenCalled();
    expect(allUsers).toEqual(users);
  });
});
