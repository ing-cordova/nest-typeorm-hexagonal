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
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateUserProfileUseCase>(CreateUserProfileUseCase);
    repository = module.get<UserProfileRepository>(UserProfileRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user with hashed password', async () => {
    const dto: CreateUserProfileUseCaseDto = {
      first_name: 'John',
      last_name: 'Doe',
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'plainPassword',
      country_id: 1,
      user_type_id: 1,
    };

    const hashedPassword = 'hashedPassword';
    jest.spyOn(passwordService, 'encryptPassword').mockReturnValue(hashedPassword);

    const result = await useCase.execute(dto);

    expect(passwordService.encryptPassword).toHaveBeenCalledWith(dto.password);
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        first_name: dto.first_name,
        last_name: dto.last_name,
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        country_id: dto.country_id,
        user_type_id: dto.user_type_id,
      }),
    );
    expect(result.userProfile.password).toBe(hashedPassword);
  });

  it('should throw an error if repository create fails', async () => {
    const dto: CreateUserProfileUseCaseDto = {
      first_name: 'John',
      last_name: 'Doe',
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'plainPassword',
      country_id: 1,
      user_type_id: 1,
    };

    jest.spyOn(passwordService, 'encryptPassword').mockReturnValue('hashedPassword');
    jest.spyOn(repository, 'create').mockRejectedValue(new Error('Repository create failed'));

    await expect(useCase.execute(dto)).rejects.toThrow('Repository create failed');
  });

  it('should create a user with the correct created_at date', async () => {
    const dto: CreateUserProfileUseCaseDto = {
      first_name: 'John',
      last_name: 'Doe',
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'plainPassword',
      country_id: 1,
      user_type_id: 1,
    };

    const hashedPassword = 'hashedPassword';
    jest.spyOn(passwordService, 'encryptPassword').mockReturnValue(hashedPassword);

    const result = await useCase.execute(dto);

    expect(result.userProfile.created_at).toBeInstanceOf(Date);
  });
});
