import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Country } from "../api/country/domain/country.model";

export class CountrySeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const countryRepository = dataSource.getRepository(Country);

        await countryRepository.insert([
            {
                name: 'El Salvador',
                iso2: 'SV',
                iso3: 'SLV',
                phone_code: '503',
                flag: '🇸🇻',
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: new Date(),
            },
            {
                name: 'Estados Unidos',
                iso2: 'US',
                iso3: 'USA',
                phone_code: '1',
                flag: '🇺🇸',
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: new Date(),
            }
        ]);
    }
}