import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Country } from "../api/country/domain/country.model";
import * as fs from "fs";
import * as path from "path";

export class CountrySeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        try {
            const countryRepository = dataSource.getRepository(Country);

            const filePath = path.join(process.cwd(), "src/context/docs/countries-v1.json")
            const fileData = await fs.promises.readFile(filePath, 'utf-8');
            const jsonData = JSON.parse(fileData);

            const countriesToInsert = jsonData.filter((country: any) => country.name).map((country: any) => ({
                name: country.name,
                iso2: country.iso2,
                iso3: country.iso3,
                phone_code: country.phone_code,
                region: country.region,
                currency: country.currency,
                created_at: new Date(),
            }));

            await countryRepository.insert(countriesToInsert);
            console.log('> Seeded Countries Successfully');
        }
        catch (err) {
            console.error(err);
            throw new Error(err);
        }
    }
}