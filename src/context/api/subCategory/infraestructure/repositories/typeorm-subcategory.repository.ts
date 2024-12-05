import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { SubCategoryRepository } from "../../domain/subcategory.repository";
import { SubCategory } from "../../domain/subcategory.model";
import { Repository } from "typeorm";

@Injectable()
export class TypeormSubCategoryRepository extends SubCategoryRepository {
    constructor(
        @InjectRepository(SubCategory)
        private readonly categoryRepository: Repository<SubCategory>,
    ) {
        super();
    }

    async findByCategoryId(categoryId: number): Promise<SubCategory[]> {
        return this.categoryRepository.find({
            where: { category_id: categoryId },
            relations: ['category']
        });
    }
}