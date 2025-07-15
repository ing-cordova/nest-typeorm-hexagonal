import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Region } from "../api/region/domain/region.model";
import { Logger } from "@nestjs/common";

export class RegionSeeder implements Seeder {
    private readonly logger = new Logger(RegionSeeder.name);
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
        this.logger.log('[🌱] Seeded Region Successfully');
    }
}