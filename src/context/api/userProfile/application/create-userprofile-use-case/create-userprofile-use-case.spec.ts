import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import * as passwordService from '../../../../services/password-service';
import { CreateUserProfileUseCase } from './create-userprofile-use-case';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { CreateUserProfileUseCaseDto } from './create-userprofile-use-case.dto';

describe('CreateUserProfileUseCase', () => {
  let useCase: CreateUserProfileUseCase;
  let repository: UserProfileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProfileUseCase,
        {
          provide: UserProfileRepository,
          useValue: {
            create: jest.fn(),  // Mock de la función create
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateUserProfileUseCase>(CreateUserProfileUseCase);
    repository = module.get<UserProfileRepository>(UserProfileRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada test
  });

  it('should create a new user with hashed password', async () => {
    // Arrange
    const dto: CreateUserProfileUseCaseDto = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'hashedPassword',
    };

    // Mock de bcrypt.hash para devolver una contraseña encriptada
    const hashedPassword = 'hashedPassword';
    jest.spyOn(passwordService, 'encryptPassword' as any).mockReturnValue(hashedPassword);

    // Act
    const result = await useCase.execute(dto);

    // Assert
    expect(passwordService.encryptPassword).toHaveBeenCalledWith(dto.password); // Verifica que bcrypt.hash fue llamado con la contraseña y el salt
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        username: dto.username,
        email: dto.email,
        password: hashedPassword, // Verifica que la contraseña fue encriptada antes de ser guardada
      }),
    );
    expect(result.userProfile.password).toBe(hashedPassword);
  });
});
