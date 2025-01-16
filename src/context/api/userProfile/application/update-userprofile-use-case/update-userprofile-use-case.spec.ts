import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserProfileUseCase } from './update-userprofile-use-case';
import { Country } from '../../../country/domain/country.model';
import { UserProfileRepository } from '../../domain/userprofile.repository';
import { UserProfile } from '../../domain/userprofile.model';
import { UserProfileCannotUpdateException } from '../../domain/userprofile-cannot-update-exception';

describe('UpdateUserProfileUseCase', () => {
    let updateUserProfileUseCase: UpdateUserProfileUseCase;
    let userProfileRepository: UserProfileRepository;

    const mockUserProfileRepository = {
        updateById: jest.fn(),
        findById: jest.fn(),
    };

    describe('UpdateUserProfileUseCase', () => {
        let updateUserProfileUseCase: UpdateUserProfileUseCase;
        let userProfileRepository: UserProfileRepository;

        const mockUserProfileRepository = {
            updateById: jest.fn(),
            findByUsername: jest.fn(),
        };

        const mockUserProfile: UserProfile = {
            id: '12345-12345-12345-12345-12345',
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
        };

        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    UpdateUserProfileUseCase,
                    {
                        provide: UserProfileRepository,
                        useValue: mockUserProfileRepository,
                    },
                ],
            }).compile();

            updateUserProfileUseCase = module.get<UpdateUserProfileUseCase>(UpdateUserProfileUseCase);
            userProfileRepository = module.get<UserProfileRepository>(UserProfileRepository);
        });

        it('debe actualizar un usuario autenticado exitosamente', async () => {
            mockUserProfileRepository.findByUsername.mockResolvedValue({ id: 1 });
            mockUserProfileRepository.updateById.mockResolvedValue(mockUserProfile);

            const username = 'testuser';
            const reqBody = { username: 'newUsername', email: 'newEmail@example.com' };

            const result = await updateUserProfileUseCase.execute(username, reqBody);

            expect(mockUserProfileRepository.findByUsername).toHaveBeenCalledWith(username);
            expect(mockUserProfileRepository.updateById).toHaveBeenCalledWith(1, { username: 'newUsername', email: 'newEmail@example.com' });
            expect(result.userProfile).toEqual(mockUserProfile);
        });

        it('debe lanzar una excepción si no se puede actualizar el usuario', async () => {
            mockUserProfileRepository.findByUsername.mockResolvedValue({ id: 1 });
            mockUserProfileRepository.updateById.mockRejectedValue(new Error());

            const username = 'testuser';
            const reqBody = { username: 'newUsername', email: 'newEmail@example.com' };

            await expect(updateUserProfileUseCase.execute(username, reqBody)).rejects.toThrow(UserProfileCannotUpdateException);

            expect(mockUserProfileRepository.findByUsername).toHaveBeenCalledWith(username);
            expect(mockUserProfileRepository.updateById).toHaveBeenCalledWith(1, { username: 'newUsername', email: 'newEmail@example.com' });
        });

        it('debe actualizar solo los campos permitidos', async () => {
            mockUserProfileRepository.findByUsername.mockResolvedValue({ id: 1 });
            mockUserProfileRepository.updateById.mockResolvedValue(mockUserProfile);

            const username = 'testuser';
            const reqBody = { username: 'newUsername', email: 'newEmail@example.com', user_type_id: 2 };

            const result = await updateUserProfileUseCase.execute(username, reqBody);

            expect(mockUserProfileRepository.findByUsername).toHaveBeenCalledWith(username);
            expect(mockUserProfileRepository.updateById).toHaveBeenCalledWith(1, { username: 'newUsername', email: 'newEmail@example.com' });
            expect(result.userProfile).toEqual(mockUserProfile);
        });
    })
});
