import { SubCategory } from './subcategory.model';
import { Category } from '../../category/domain/category.model';
import { plainToClass } from 'class-transformer';

describe('SubCategory Model', () => {
    it('should create a SubCategory instance', () => {
        const category = new Category();
        category.id = 1;

        const subCategory = new SubCategory();
        subCategory.id = 1;
        subCategory.category_id = category.id;
        subCategory.name = 'Test SubCategory';
        subCategory.description = 'Test Description';
        subCategory.created_at = new Date();
        subCategory.updated_at = new Date();
        subCategory.deleted_at = null;
        subCategory.category = category;

        expect(subCategory).toBeInstanceOf(SubCategory);
        expect(subCategory.id).toBe(1);
        expect(subCategory.category_id).toBe(1);
        expect(subCategory.name).toBe('Test SubCategory');
        expect(subCategory.description).toBe('Test Description');
        expect(subCategory.created_at).toBeInstanceOf(Date);
        expect(subCategory.updated_at).toBeInstanceOf(Date);
        expect(subCategory.deleted_at).toBeNull();
        expect(subCategory.category).toBe(category);
    });

    it('should exclude created_at, updated_at, and deleted_at from JSON', () => {
        const category = new Category();
        category.id = 1;

        const subCategory = new SubCategory();
        subCategory.id = 1;
        subCategory.category_id = category.id;
        subCategory.name = 'Test SubCategory';
        subCategory.description = 'Test Description';
        subCategory.created_at = new Date();
        subCategory.updated_at = new Date();
        subCategory.deleted_at = null;
        subCategory.category = category;

        const json = plainToClass(SubCategory, subCategory);
        const jsonString = JSON.stringify(json);
        const parsedJson = JSON.parse(jsonString);

        expect(parsedJson.created_at).toBeUndefined();
        expect(parsedJson.updated_at).toBeUndefined();
        expect(parsedJson.deleted_at).toBeUndefined();
    });

    it('should update SubCategory properties', () => {
        const subCategory = new SubCategory();
        subCategory.name = 'Initial Name';
        subCategory.description = 'Initial Description';

        subCategory.name = 'Updated Name';
        subCategory.description = 'Updated Description';

        expect(subCategory.name).toBe('Updated Name');
        expect(subCategory.description).toBe('Updated Description');
    });

    it('should handle null values for optional fields', () => {
        const subCategory = new SubCategory();
        subCategory.name = 'Test SubCategory';
        subCategory.description = null;

        expect(subCategory.name).toBe('Test SubCategory');
        expect(subCategory.description).toBeNull();
    });
});