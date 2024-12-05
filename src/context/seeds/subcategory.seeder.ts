import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Category } from "../api/category/domain/category.model";
import { SubCategory } from "../api/subCategory/domain/subcategory.model";

export class SubCategorySeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const subCategoryRepository = dataSource.getRepository(SubCategory);

        const subCategoryToInsert = [
            {
                category_id: 1,
                name: "N/A",
                description: "Sub Category not available",
            },
            {
                category_id: 2,
                name: "ENGLISH",
                description: "Sub Category for English",
            },
            {
                category_id: 2,
                name: "FRENCH",
                description: "Sub Category for French",
            },
            {
                category_id: 3,
                name: "INTELLIGENCE ARTIFICIELLE (IA)",
                description: "Sub Category for Artificial Intelligence",
            },
        ]

        await subCategoryRepository.insert(subCategoryToInsert);
        console.log('> Seeded SubCategorySeeder Successfully');
    }
}