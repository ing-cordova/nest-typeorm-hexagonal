import { State } from './state.model';
import { Country } from '../../country/domain/country.model';
import { classToPlain } from 'class-transformer';

describe('State Model', () => {
    it('should create a state instance', () => {
        const country = new Country();
        country.id = 1;
        country.name = 'Test Country';

        const state = new State();
        state.id = 1;
        state.name = 'Test State';
        state.state_code = 'TS';
        state.country_id = country.id;
        state.country = country;

        expect(state).toBeInstanceOf(State);
        expect(state.id).toBe(1);
        expect(state.name).toBe('Test State');
        expect(state.state_code).toBe('TS');
        expect(state.country_id).toBe(1);
        expect(state.country).toBe(country);
    });

    it('should exclude created_at, updated_at, and deleted_at from JSON', () => {
        const state = new State();
        state.created_at = new Date();
        state.updated_at = new Date();
        state.deleted_at = new Date();

        const json = classToPlain(state);
        const parsed = JSON.parse(JSON.stringify(json));

        expect(parsed.created_at).toBeUndefined();
        expect(parsed.updated_at).toBeUndefined();
        expect(parsed.deleted_at).toBeUndefined();
    });
});