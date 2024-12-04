import { State } from "./state.model";

export abstract class StateRepository {
    abstract findByCountryId(countryId: number): Promise<State[]>;
}