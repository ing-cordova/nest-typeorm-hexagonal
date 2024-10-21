import { Test } from '@nestjs/testing';
import { TypeOrmAuthUserRepository } from './typeorm-authuser.repository';
import { AuthUser } from '../../domain/authuser.model';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

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
      { id:1, username: 'user1', email: 'user1@example.com', password: 'password' },
      { id:2, username: 'user2', email: 'user2@example.com', password: 'password' },
    ];

    mockRepository.find.mockResolvedValue(users);  // También aquí aseguramos que el mock funcione

    // Act: Llamar al método findAll
    const allUsers = await authUserRepository.findAll();

    // Assert: Verificar que se llamó al método 'find'
    expect(mockRepository.find).toHaveBeenCalled();
    expect(allUsers).toEqual(users);
  });
});
