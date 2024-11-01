import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { City } from "../api/City/domain/city.model";

export class CitySeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const cityRepository = dataSource.getRepository(City);

        await cityRepository.insert([
            {
                name: 'San Salvador',
                country: { id: 1 },
                created_at: new Date(),
            },
            {
                name: 'San Francisco',
                country: { id: 2 },
                created_at: new Date(),
            },
        ]);
    }
}