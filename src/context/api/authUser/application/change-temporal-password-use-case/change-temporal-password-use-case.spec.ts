import { Test, TestingModule } from '@nestjs/testing';
import { ChangeTemporalPasswordUseCase } from './change-temporal-password-use-case';
import { AuthUserRepository } from '../../domain/authuser.repository';
import { ChangeTemporalPasswordUseCaseDto } from './change-temporal-password-use-case.dto';
import { HttpException } from '@nestjs/common';

describe('ChangeTemporalPasswordUseCase', () => {
    let useCase: ChangeTemporalPasswordUseCase;
    let authUserRepository: AuthUserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangeTemporalPasswordUseCase,
                {
                    provide: AuthUserRepository,
                    useValue: {
                        changePassword: jest.fn(),
                    },
                },
            ],
        }).compile();

        useCase = module.get<ChangeTemporalPasswordUseCase>(ChangeTemporalPasswordUseCase);
        authUserRepository = module.get<AuthUserRepository>(AuthUserRepository);
    });

    it('should change the temporal password successfully', async () => {
        const dto: ChangeTemporalPasswordUseCaseDto = {
            username: 'johndoe',
            password: 'newpassword123',
        };

        jest.spyOn(authUserRepository, 'changePassword').mockResolvedValue(undefined);

        await expect(useCase.execute(dto)).resolves.not.toThrow();
        expect(authUserRepository.changePassword).toHaveBeenCalledWith(dto.username, dto.password);
    });

    it('should throw an error if change password fails', async () => {
        const dto: ChangeTemporalPasswordUseCaseDto = {
            username: 'johndoe',
            password: 'newpassword123',
        };

        jest.spyOn(authUserRepository, 'changePassword').mockRejectedValue(new Error('Change password failed'));

        await expect(useCase.execute(dto)).rejects.toThrow(HttpException);
        await expect(useCase.execute(dto)).rejects.toThrow('Change password failed');
    });
});