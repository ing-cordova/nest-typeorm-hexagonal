import { Category } from "./category.model";

export abstract class CategoryRepository {
    abstract findAll(): Promise<Category[]>;
}