import { Test, TestingModule } from '@nestjs/testing';
import { GetCountriesUseCase } from './get-countries-use-case';
import { CountryRepository } from '../../domain/country.repository';
import { BadRequestException } from '@nestjs/common';

describe('GetCountriesUseCase', () => {
    let getCountriesUseCase: GetCountriesUseCase;
    let countryRepository: CountryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetCountriesUseCase,
                {
                    provide: CountryRepository,
                    useValue: {
                        findAll: jest.fn(),
                    },
                },
            ],
        }).compile();

        getCountriesUseCase = module.get<GetCountriesUseCase>(GetCountriesUseCase);
        countryRepository = module.get<CountryRepository>(CountryRepository);
    });

    it('should be defined', () => {
        expect(getCountriesUseCase).toBeDefined();
    });

    it('should return a list of countries', async () => {
        const result = [
            { id: 1, name: 'Country1', iso2: 'C1', iso3: 'CO1', phone_code: '001', region: 'Region1', currency: 'Currency1', created_at: new Date(), updated_at: new Date(), deleted_at: null },
            { id: 2, name: 'Country2', iso2: 'C2', iso3: 'CO2', phone_code: '002', region: 'Region2', currency: 'Currency2', created_at: new Date(), updated_at: new Date(), deleted_at: null }
        ];
        jest.spyOn(countryRepository, 'findAll').mockResolvedValue(result);

        expect(await getCountriesUseCase.execute()).toBe(result);
    });

    it('should throw BadRequestException on error', async () => {
        jest.spyOn(countryRepository, 'findAll').mockRejectedValue(new BadRequestException('Some error'));

        await expect(getCountriesUseCase.execute()).rejects.toThrow(BadRequestException);
    });
});