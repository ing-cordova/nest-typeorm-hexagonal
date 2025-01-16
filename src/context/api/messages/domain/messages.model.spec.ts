import { Messages } from './messages.model';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

describe('Messages Model', () => {
    it('should create a new message instance', () => {
        const message = new Messages();
        message.full_name = 'John Doe';
        message.email = 'john.doe@example.com';
        message.phone_number = '1234567890';
        message.message = 'Hello, this is a test message';

        expect(message).toBeInstanceOf(Messages);
        expect(message.full_name).toBe('John Doe');
        expect(message.email).toBe('john.doe@example.com');
        expect(message.phone_number).toBe('1234567890');
        expect(message.message).toBe('Hello, this is a test message');
    });

    it('should exclude created_at, updated_at, and deleted_at from JSON output', () => {
        const message = new Messages();
        message.full_name = 'John Doe'; 
        message.email = 'john.doe@example.com';
        message.phone_number = '1234567890';
        message.message = 'Hello, this is a test message';
        message.created_at = new Date();
        message.updated_at = new Date();
        message.deleted_at = new Date();

        const json = plainToClass(Messages, message);

        expect(json.created_at).toBeUndefined();
        expect(json.updated_at).toBeUndefined();
        expect(json.deleted_at).toBeUndefined();
    });
});