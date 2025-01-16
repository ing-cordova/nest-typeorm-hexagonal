import { Category } from './category.model';
import { plainToClass } from 'class-transformer';

describe('Category Model', () => {
    it('should create a category instance', () => {
        const category = new Category();
        expect(category).toBeInstanceOf(Category);
    });

    it('should have default properties', () => {
        const category = new Category();
        category.id = 1;
        category.name = 'Default Name';
        category.description = 'Default Description';
        category.created_at = new Date();
        category.updated_at = new Date();
        category.deleted_at = new Date();

        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('created_at');
        expect(category).toHaveProperty('updated_at');
        expect(category).toHaveProperty('deleted_at');
    });

    it('should set properties correctly', () => {
        const category = new Category();
        category.name = 'Test Category';
        category.description = 'This is a test category';

        expect(category.name).toBe('Test Category');
        expect(category.description).toBe('This is a test category');
    });

    it('should exclude certain properties from serialization', () => {
        const category = new Category();
        category.created_at = new Date();
        category.updated_at = new Date();
        category.deleted_at = new Date();

        const serializedCategory = plainToClass(Category, category);
        const json = JSON.stringify(serializedCategory);
        const parsed = JSON.parse(json);

        expect(parsed).not.toHaveProperty('created_at');
        expect(parsed).not.toHaveProperty('updated_at');
        expect(parsed).not.toHaveProperty('deleted_at');
    });

    it('should handle partial updates', () => {
        const category = new Category();
        category.name = 'Initial Name';
        category.description = 'Initial Description';

        const updatedCategory = Object.assign(category, { name: 'Updated Name' });

        expect(updatedCategory.name).toBe('Updated Name');
        expect(updatedCategory.description).toBe('Initial Description');
    });

    it('should handle null and undefined values', () => {
        const category = new Category();
        category.name = null;
        category.description = undefined;

        expect(category.name).toBeNull();
        expect(category.description).toBeUndefined();
    });
});