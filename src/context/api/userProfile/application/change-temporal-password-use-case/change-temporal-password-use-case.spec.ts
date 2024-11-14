import { Test, TestingModule } from '@nestjs/testing';
import { ChangeTemporalPasswordUseCase } from './change-temporal-password-use-case';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { ChangeTemporalPasswordUseCaseDto } from './change-temporal-password-use-case.dto';
import { HttpException } from '@nestjs/common';

describe('ChangeTemporalPasswordUseCase', () => {
    let useCase: ChangeTemporalPasswordUseCase;
    let userProfileRepository: UserProfileRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChangeTemporalPasswordUseCase,
                {
                    provide: UserProfileRepository,
                    useValue: {
                        changePassword: jest.fn(),
                    },
                },
            ],
        }).compile();

        useCase = module.get<ChangeTemporalPasswordUseCase>(ChangeTemporalPasswordUseCase);
        userProfileRepository = module.get<UserProfileRepository>(UserProfileRepository);
    });

    it('should change the temporal password successfully', async () => {
        const dto: ChangeTemporalPasswordUseCaseDto = {
            username: 'johndoe',
            password: 'newpassword123',
        };

        jest.spyOn(userProfileRepository, 'changePassword').mockResolvedValue(undefined);

        await expect(useCase.execute(dto)).resolves.not.toThrow();
        expect(userProfileRepository.changePassword).toHaveBeenCalledWith(dto.username, dto.password);
    });

    it('should throw an error if change password fails', async () => {
        const dto: ChangeTemporalPasswordUseCaseDto = {
            username: 'johndoe',
            password: 'newpassword123',
        };

        jest.spyOn(userProfileRepository, 'changePassword').mockRejectedValue(new Error('Change password failed'));

        await expect(useCase.execute(dto)).rejects.toThrow(HttpException);
        await expect(useCase.execute(dto)).rejects.toThrow('Change password failed');
    });
});