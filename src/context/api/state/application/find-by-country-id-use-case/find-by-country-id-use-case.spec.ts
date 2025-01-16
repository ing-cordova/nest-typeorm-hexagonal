import { Test, TestingModule } from '@nestjs/testing';
import { FindByCountryIdUseCase } from './find-by-country-id-use-case';
import { StateRepository } from '../../domain/state.repository';
import { BadRequestException } from '@nestjs/common';

describe('FindByCountryIdUseCase', () => {
    let findByCountryIdUseCase: FindByCountryIdUseCase;
    let stateRepository: StateRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindByCountryIdUseCase,
                {
                    provide: StateRepository,
                    useValue: {
                        findByCountryId: jest.fn(),
                    },
                },
            ],
        }).compile();

        findByCountryIdUseCase = module.get<FindByCountryIdUseCase>(FindByCountryIdUseCase);
        stateRepository = module.get<StateRepository>(StateRepository);
    });

    it('should be defined', () => {
        expect(findByCountryIdUseCase).toBeDefined();
    });

    it('should return states for a valid countryId', async () => {
        const countryId = 1;
        const states = [{ id: 1, name: 'State 1', state_code: 'S1', country_id: 1, created_at: new Date(), updated_at: new Date(), deleted_at: null, country: { id: 1, name: 'Country 1', iso2: 'C1', iso3: 'CO1', phone_code: '001', region: 'Region1', currency: 'Currency1', created_at: new Date(), updated_at: new Date(), deleted_at: null } }];
        jest.spyOn(stateRepository, 'findByCountryId').mockResolvedValue(states);

        expect(await findByCountryIdUseCase.execute(countryId)).toBe(states);
        expect(stateRepository.findByCountryId).toHaveBeenCalledWith(countryId);
    });

    it('should throw BadRequestException for invalid countryId', async () => {
        const countryId = -1;
        const errorMessage = 'Invalid countryId';
        jest.spyOn(stateRepository, 'findByCountryId').mockRejectedValue(new BadRequestException(errorMessage));

        await expect(findByCountryIdUseCase.execute(countryId)).rejects.toThrow(BadRequestException);
        expect(stateRepository.findByCountryId).toHaveBeenCalledWith(countryId);
    });
});