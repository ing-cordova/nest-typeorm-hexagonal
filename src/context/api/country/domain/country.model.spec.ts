import { Country } from './country.model';
import { classToPlain } from 'class-transformer';

describe('Country Model', () => {
    it('should create a country instance', () => {
        const country = new Country();
        country.id = 1;
        country.name = 'Test Country';
        country.iso2 = 'TC';
        country.iso3 = 'TST';
        country.phone_code = '123';
        country.region = 'Test Region';
        country.currency = 'TST';

        expect(country).toBeInstanceOf(Country);
        expect(country.id).toBe(1);
        expect(country.name).toBe('Test Country');
        expect(country.iso2).toBe('TC');
        expect(country.iso3).toBe('TST');
        expect(country.phone_code).toBe('123');
        expect(country.region).toBe('Test Region');
        expect(country.currency).toBe('TST');
    });

    it('should exclude certain columns from serialization', () => {
        const country = new Country();
        country.created_at = new Date();
        country.updated_at = new Date();
        country.deleted_at = new Date();

        const serializedCountry = classToPlain(country);
        expect(serializedCountry.created_at).toBeUndefined();
        expect(serializedCountry.updated_at).toBeUndefined();
        expect(serializedCountry.deleted_at).toBeUndefined();
    });
});