import { BadRequestException } from "@nestjs/common";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { CategoryRepository } from "../../domain/category.repository";

@Injectable()
export class GetAllCategoriesUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute() {
        try {
            return this.categoryRepository.findAll();
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}