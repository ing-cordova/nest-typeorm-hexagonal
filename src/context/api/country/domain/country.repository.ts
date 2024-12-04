import { Country } from "./country.model";

export abstract class CountryRepository {
    abstract findAll(): Promise<Country[]>;
}