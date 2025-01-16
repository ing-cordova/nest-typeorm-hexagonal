import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Region } from "../api/region/domain/region.model";
import { SubRegion } from "../api/subRegion/domain/sub-region.model";

export class SubRegionSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const subRegionRepository = dataSource.getRepository(SubRegion);

        const subRegionToInsert = [
            {
                region_id: 1,
                name: "Northern Africa",
            },
            {
                region_id: 1,
                name: "Middle Africa",
            },
            {
                region_id: 1,
                name: "Western Africa",
            },
            {
                region_id: 1,
                name: "Eastern Africa",
            },  
            {
                region_id: 1,
                name: "Southern Africa",
            },  
            {
                region_id: 2,
                name: "Northern America",
            },  
            {
                region_id: 2,
                name: "Caribbean",
            },  
            {
                region_id: 2,
                name: "South America",
            },
            {
                region_id: 2,
                name: "Central America",
            },  
            {
                region_id: 3,
                name: "Central Asia",
            },  
            {
                region_id: 3,
                name: "Western Asia",
            },  
            {
                region_id: 3,
                name: "Eastern Asia",
            },  
            {
                region_id: 3,
                name: "South-Eastern Asia",
            },    
            {
                region_id: 3,
                name: "Southern Asia",
            },  
            {
                region_id: 4,
                name: "Eastern Europe",
            },  
            {
                region_id: 4,
                name: "Southern Europe",
            },  
            {
                region_id: 4,
                name: "Western Europe",
            },  
            {
                region_id: 4,
                name: "Northern Europe",
            },  
            {
                region_id: 5,
                name: "Australia and New Zealand",
            },  
            {
                region_id: 5,
                name: "Melanesia",
            },  
            {
                region_id: 5,
                name: "Micronesia",
            },  
            {
                region_id: 5,
                name: "Polynesia",
            }
        ]

        await subRegionRepository.insert(subRegionToInsert);
        console.log('> Seeded SubRegion Successfully');
    }
}