import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Category } from "../api/category/domain/category.model";
import { Logger } from "@nestjs/common";

export class CategorySeeder implements Seeder {
    
    private readonly logger = new Logger(CategorySeeder.name);
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const categoryRepository = dataSource.getRepository(Category);

        const categoryToInsert = [
            {
                name: "N/A",
                description: "Category not available",
            },
            {
                name: "LANGUAGES",
                description: "Category for languages",
            },
            {
                name: "TECHNOLOGY",
                description: "Category for technology",
            },
            {
                name: "FINANCE",
                description: "Category for finance",
            },
            {
                name: "GENERAL EDUCATION",
                description: "Category for general education",
            },
        ]

        await categoryRepository.insert(categoryToInsert);
        this.logger.log('[🌱] Seeded Category Successfully');
    }
}