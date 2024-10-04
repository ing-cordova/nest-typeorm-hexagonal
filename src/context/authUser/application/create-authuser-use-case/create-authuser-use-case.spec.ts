import { Test, TestingModule } from '@nestjs/testing';
import { CreateAuthUserUseCase } from './create-authuser-use-case';
import { AuthUserRepository } from '../../domain/authuser.repository';
import * as bcrypt from 'bcrypt';
import { AuthUser } from '../../domain/authuser.model';
import { CreateAuthUserUseCaseDto } from './create-authuser-use-case.dto';

describe('CreateAuthUserUseCase', () => {
  let useCase: CreateAuthUserUseCase;
  let repository: AuthUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAuthUserUseCase,
        {
          provide: AuthUserRepository,
          useValue: {
            create: jest.fn(),  // Mock de la función create
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateAuthUserUseCase>(CreateAuthUserUseCase);
    repository = module.get<AuthUserRepository>(AuthUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada test
  });

  it('should create a new user with hashed password', async () => {
    // Arrange
    const dto: CreateAuthUserUseCaseDto = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'plainPassword',
    };

    // Mock de bcrypt.hash para devolver una contraseña encriptada
    const hashedPassword = 'hashedPassword';
    jest.spyOn(bcrypt, 'hash' as any).mockResolvedValueOnce(hashedPassword);

    // Act
    const result = await useCase.execute(dto);

    // Assert
    expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10); // Verifica que bcrypt.hash fue llamado con la contraseña y el salt
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        username: dto.username,
        email: dto.email,
        password: hashedPassword, // Verifica que la contraseña fue encriptada antes de ser guardada
      }),
    );
    expect(result.authUser.password).toBe(hashedPassword);
  });
});
