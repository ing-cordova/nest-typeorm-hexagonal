import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { CategoryRepository } from "../../domain/category.repository";
import { Category } from "../../domain/category.model";
import { Repository } from "typeorm";

@Injectable()
export class TypeormCategoryRepository extends CategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {
        super();
    }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }
}