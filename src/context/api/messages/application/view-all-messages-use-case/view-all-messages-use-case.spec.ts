import { Test, TestingModule } from '@nestjs/testing';
import { ViewAllMessagesUseCase } from './view-all-messages-use-case';
import { MessagesRepository } from '../../domain/messages.repository';
import { PaginationService } from '../../../../services/pagination/pagination.service';
import { Messages } from '../../domain/messages.model';

describe('ViewAllMessagesUseCase', () => {
    let viewAllMessagesUseCase: ViewAllMessagesUseCase;
    let messagesRepository: MessagesRepository;
    let paginationService: PaginationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ViewAllMessagesUseCase,
                {
                    provide: MessagesRepository,
                    useValue: {
                        findAllWithPagination: jest.fn(),
                    },
                },
                {
                    provide: PaginationService,
                    useValue: {
                        paginate: jest.fn(),
                    },
                },
            ],
        }).compile();

        viewAllMessagesUseCase = module.get<ViewAllMessagesUseCase>(ViewAllMessagesUseCase);
        messagesRepository = module.get<MessagesRepository>(MessagesRepository);
        paginationService = module.get<PaginationService>(PaginationService);
    });

    it('should be defined', () => {
        expect(viewAllMessagesUseCase).toBeDefined();
    });

    it('should return paginated messages', async () => {
        const messages: Messages[] = [
            { id: '00000-00000-00000-00000-00001', full_name: 'John Doe', email: 'john@example.com', phone_number: '1234567890', message: 'Hello', created_at: new Date(), updated_at: new Date(), deleted_at: null },
            { id: '00000-00000-00000-00000-00002', full_name: 'Jane Doe', email: 'jane@example.com', phone_number: '0987654321', message: 'Hi', created_at: new Date(), updated_at: new Date(), deleted_at: null },
        ];
        const total = 2;
        const page = 1;
        const pageSize = 10;

        jest.spyOn(messagesRepository, 'findAllWithPagination').mockResolvedValue({ data: messages, total, nextPage: null, prevPage: null, limit: pageSize });
        jest.spyOn(paginationService, 'paginate').mockReturnValue({
            data: messages,
            total,
            nextPage: null,
            prevPage: null,
            limit: pageSize,
        });

        const result = await viewAllMessagesUseCase.execute(page, pageSize);

        expect(messagesRepository.findAllWithPagination).toHaveBeenCalledWith(page, pageSize);
        expect(paginationService.paginate).toHaveBeenCalledWith(messages, total, page, pageSize);
        expect(result).toEqual({
            data: messages,
            total,
            nextPage: null,
            prevPage: null,
            limit: pageSize,
        });
    });
});