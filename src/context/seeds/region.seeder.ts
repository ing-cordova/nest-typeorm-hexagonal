import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Region } from "../api/region/domain/region.model";

export class RegionSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const regionRepository = dataSource.getRepository(Region);

        const regionToInsert = [
            {
                name: "Africa",
            },
            {
                name: "Americas"
            },
            {
                name: "Asia"
            },
            {
                name: "Europe"
            },
            {
                name: "Oceania"
            },
            {
                name: "Polar"
            },
        ]

        await regionRepository.insert(regionToInsert);
        console.log('> Seeded Region Successfully');
    }
}