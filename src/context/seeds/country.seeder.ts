import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Country } from "../api/country/domain/country.model";
import { Logger } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

export class CountrySeeder implements Seeder {
    private readonly logger = new Logger(CountrySeeder.name);
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
                region_id: country.region_id && country.region_id !== 0 ? country.region_id : null,
                sub_region_id: country.subregion_id && country.subregion_id !== 0 ? country.subregion_id : null,
                currency: country.currency,
                currency_name: country.currency_name,
                currency_symbol: country.currency_symbol,
                nationality: country.nationality,
                created_at: new Date(),
            }));

            await countryRepository.insert(countriesToInsert);
            this.logger.log('[🌱] Seeded Country Successfully');
        }
        catch (err) {
            this.logger.error('[🚫] Error seeding Country', err);
            throw new Error(err);
        }
    }
}