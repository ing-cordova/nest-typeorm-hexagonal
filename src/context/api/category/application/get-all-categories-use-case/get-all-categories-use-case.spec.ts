import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { GetAllCategoriesUseCase } from './get-all-categories-use-case';
import { CategoryRepository } from '../../domain/category.repository';

describe('GetAllCategoriesUseCase', () => {
    let getAllCategoriesUseCase: GetAllCategoriesUseCase;
    let categoryRepository: CategoryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAllCategoriesUseCase,
                {
                    provide: CategoryRepository,
                    useValue: {
                        findAll: jest.fn(),
                    },
                },
            ],
        }).compile();

        getAllCategoriesUseCase = module.get<GetAllCategoriesUseCase>(GetAllCategoriesUseCase);
        categoryRepository = module.get<CategoryRepository>(CategoryRepository);
    });

    it('should be defined', () => {
        expect(getAllCategoriesUseCase).toBeDefined();
    });

    it('should return all categories', async () => {
        const categories = [
            { id: 1, name: 'Category 1', description: 'Description 1', created_at: new Date(), updated_at: new Date(), deleted_at: null },
            { id: 2, name: 'Category 2', description: 'Description 2', created_at: new Date(), updated_at: new Date(), deleted_at: null }
        ];
        jest.spyOn(categoryRepository, 'findAll').mockResolvedValue(categories);

        expect(await getAllCategoriesUseCase.execute()).toBe(categories);
    });

    it('should throw BadRequestException when an error occurs', async () => {
        const errorMessage = 'An error occurred';
        jest.spyOn(categoryRepository, 'findAll').mockRejectedValue(new BadRequestException(errorMessage));

        await expect(getAllCategoriesUseCase.execute()).rejects.toThrow(BadRequestException);
        await expect(getAllCategoriesUseCase.execute()).rejects.toThrow(errorMessage);
    });
});