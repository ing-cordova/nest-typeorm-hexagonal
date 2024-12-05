import { SubCategory } from "./subcategory.model";

export abstract class SubCategoryRepository {
    abstract findByCategoryId(categoryId: number): Promise<SubCategory[]>;
}