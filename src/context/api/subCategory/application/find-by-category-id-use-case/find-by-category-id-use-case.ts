import { BadRequestException } from "@nestjs/common";
import { Injectable } from "../../../../shared/dependency-injection/injectable";
import { SubCategoryRepository } from "../../domain/subcategory.repository";

@Injectable()
export class FindByCategoryIdUseCase {
    constructor(private readonly subCategoryRepository: SubCategoryRepository) { }

    async execute(categoryId: number) {
        try {
            return this.subCategoryRepository.findByCategoryId(categoryId);
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}