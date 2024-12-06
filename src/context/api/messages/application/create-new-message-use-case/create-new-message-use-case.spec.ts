import { Test, TestingModule } from '@nestjs/testing';
import { CreateNewMessageUseCase } from './create-new-message-use-case';
import { MessagesRepository } from '../../domain/messages.repository';
import { CreateNewMessageUseCaseDto } from './create-new-message-use-case.dto';
import { BadRequestException } from '@nestjs/common';
import { Messages } from '../../domain/messages.model';

describe('CreateNewMessageUseCase', () => {
    let useCase: CreateNewMessageUseCase;
    let messagesRepository: MessagesRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateNewMessageUseCase,
                {
                    provide: MessagesRepository,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        useCase = module.get<CreateNewMessageUseCase>(CreateNewMessageUseCase);
        messagesRepository = module.get<MessagesRepository>(MessagesRepository);
    });

    it('should create a new message successfully', async () => {
        const data: CreateNewMessageUseCaseDto = {
            full_name: 'John Doe',
            email: 'john.doe@example.com',
            phone_number: '1234567890',
            message: 'Hello, this is a test message',
        };

        await useCase.execute(data);

        expect(messagesRepository.create).toHaveBeenCalledWith(expect.any(Messages));
    });

    it('should throw BadRequestException when repository throws an error', async () => {
        const data: CreateNewMessageUseCaseDto = {
            full_name: 'John Doe',
            email: 'john.doe@example.com',
            phone_number: '1234567890',
            message: 'Hello, this is a test message',
        };

        jest.spyOn(messagesRepository, 'create').mockRejectedValue(new Error('Repository error'));

        await expect(useCase.execute(data)).rejects.toThrow(BadRequestException);
    });
});