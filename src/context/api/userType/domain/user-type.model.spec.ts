import { classToPlain } from 'class-transformer';
import { UserType } from './user-type.model';

describe('UserType', () => {
    it('should create a UserType instance', () => {
        const userType = new UserType();
        expect(userType).toBeInstanceOf(UserType);
    });

    it('should have the correct properties', () => {
        const userType = new UserType();
        userType.id = 1;
        userType.name = 'Admin';
        userType.description = 'Administrator role';
        userType.created_at = new Date();
        userType.updated_at = new Date();
        userType.deleted_at = new Date();

        expect(userType.id).toBe(1);
        expect(userType.name).toBe('Admin');
        expect(userType.description).toBe('Administrator role');
        expect(userType.created_at).toBeInstanceOf(Date);
        expect(userType.updated_at).toBeInstanceOf(Date);
        expect(userType.deleted_at).toBeInstanceOf(Date);
    });

    it('should exclude created_at, updated_at, and deleted_at from JSON', () => {
        const userType = new UserType();
        userType.id = 1;
        userType.name = 'Admin';
        userType.description = 'Administrator role';
        userType.created_at = new Date();
        userType.updated_at = new Date();
        userType.deleted_at = new Date();

        const json = classToPlain(userType);
        expect(json.created_at).toBeUndefined();
        expect(json.updated_at).toBeUndefined();
        expect(json.deleted_at).toBeUndefined();
    });
});