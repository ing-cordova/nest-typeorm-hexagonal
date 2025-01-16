import { classToPlain } from 'class-transformer';
import { PermissionUserType } from './permission-user-type.model';
import { Permission } from '../../permission/domain/permission.model';
import { UserType } from '../../userType/domain/user-type.model';

describe('PermissionUserType', () => {
    it('should create a PermissionUserType instance', () => {
        const permissionUserType = new PermissionUserType();
        expect(permissionUserType).toBeInstanceOf(PermissionUserType);
    });

    it('should have the correct properties', () => {
        const permissionUserType = new PermissionUserType();
        permissionUserType.id = 1;
        permissionUserType.user_type_id = 2;
        permissionUserType.permission_id = 3;
        permissionUserType.created_at = new Date();
        permissionUserType.updated_at = new Date();
        permissionUserType.deleted_at = new Date();

        expect(permissionUserType.id).toBe(1);
        expect(permissionUserType.user_type_id).toBe(2);
        expect(permissionUserType.permission_id).toBe(3);
        expect(permissionUserType.created_at).toBeInstanceOf(Date);
        expect(permissionUserType.updated_at).toBeInstanceOf(Date);
        expect(permissionUserType.deleted_at).toBeInstanceOf(Date);
    });

    it('should exclude created_at, updated_at, and deleted_at from JSON', () => {
        const permissionUserType = new PermissionUserType();
        permissionUserType.id = 1;
        permissionUserType.user_type_id = 2;
        permissionUserType.permission_id = 3;
        permissionUserType.created_at = new Date();
        permissionUserType.updated_at = new Date();
        permissionUserType.deleted_at = new Date();

        const json = classToPlain(permissionUserType);
        expect(json.created_at).toBeUndefined();
        expect(json.updated_at).toBeUndefined();
        expect(json.deleted_at).toBeUndefined();
    });

    it('should have correct relations', () => {
        const permissionUserType = new PermissionUserType();
        const permission = new Permission();
        const userType = new UserType();

        permissionUserType.permission = permission;
        permissionUserType.user_type = userType;

        expect(permissionUserType.permission).toBe(permission);
        expect(permissionUserType.user_type).toBe(userType);
    });
});