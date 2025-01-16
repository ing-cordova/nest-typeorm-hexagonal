import { Test, TestingModule } from '@nestjs/testing';
import { FindByCategoryIdUseCase } from './find-by-category-id-use-case';
import { SubCategoryRepository } from '../../domain/subcategory.repository';
import { BadRequestException } from '@nestjs/common';

describe('FindByCategoryIdUseCase', () => {
    let findByCategoryIdUseCase: FindByCategoryIdUseCase;
    let subCategoryRepository: SubCategoryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindByCategoryIdUseCase,
                {
                    provide: SubCategoryRepository,
                    useValue: {
                        findByCategoryId: jest.fn(),
                    },
                },
            ],
        }).compile();

        findByCategoryIdUseCase = module.get<FindByCategoryIdUseCase>(FindByCategoryIdUseCase);
        subCategoryRepository = module.get<SubCategoryRepository>(SubCategoryRepository);
    });

    it('should be defined', () => {
        expect(findByCategoryIdUseCase).toBeDefined();
    });

    it('should return subcategories for a valid categoryId', async () => {
        const categoryId = 1;
        const subcategories = [{ id: 1, name: 'SubCategory1', category_id: 1, description: 'Description', created_at: new Date(), updated_at: new Date(), deleted_at: null, category: { id: 1, name: 'Category1', description: 'Category Description', created_at: new Date(), updated_at: new Date(), deleted_at: null } }];
        jest.spyOn(subCategoryRepository, 'findByCategoryId').mockResolvedValue(subcategories);

        const result = await findByCategoryIdUseCase.execute(categoryId);
        expect(result).toEqual(subcategories);
    });

    it('should throw BadRequestException for an invalid categoryId', async () => {
        const categoryId = -1;
        const errorMessage = 'Invalid categoryId';
        jest.spyOn(subCategoryRepository, 'findByCategoryId').mockRejectedValue(new BadRequestException(errorMessage));

        await expect(findByCategoryIdUseCase.execute(categoryId)).rejects.toThrow(BadRequestException);
        await expect(findByCategoryIdUseCase.execute(categoryId)).rejects.toThrow(errorMessage);
    });
});