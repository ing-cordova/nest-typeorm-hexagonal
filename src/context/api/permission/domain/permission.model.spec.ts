import { classToPlain } from 'class-transformer';
import { Permission } from './permission.model';

describe('Permission', () => {
    it('should create a Permission instance', () => {
        const permission = new Permission();
        expect(permission).toBeInstanceOf(Permission);
    });

    it('should have the correct properties', () => {
        const permission = new Permission();
        permission.id = 1;
        permission.can = 'read';
        permission.description = 'Can read data';
        permission.created_at = new Date();
        permission.updated_at = new Date();
        permission.deleted_at = new Date();

        expect(permission.id).toBe(1);
        expect(permission.can).toBe('read');
        expect(permission.description).toBe('Can read data');
        expect(permission.created_at).toBeInstanceOf(Date);
        expect(permission.updated_at).toBeInstanceOf(Date);
        expect(permission.deleted_at).toBeInstanceOf(Date);
    });

    it('should exclude created_at, updated_at, and deleted_at from JSON', () => {
        const permission = new Permission();
        permission.id = 1;
        permission.can = 'read';
        permission.description = 'Can read data';
        permission.created_at = new Date();
        permission.updated_at = new Date();
        permission.deleted_at = new Date();

        const json = classToPlain(permission);
        expect(json.created_at).toBeUndefined();
        expect(json.updated_at).toBeUndefined();
        expect(json.deleted_at).toBeUndefined();
    });
});