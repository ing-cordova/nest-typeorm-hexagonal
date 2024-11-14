import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionUserType } from '../api/permissionUserType/domain/permission-user-type.model';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionUserType)
    private permissionUserTypeRepository: Repository<PermissionUserType>
  ) {}

  async userTypeHasPermissions(userType: string, requiredPermissions: string[]): Promise<boolean> {
    const permissions = await this.permissionUserTypeRepository
      .createQueryBuilder('permissionUserType')
      .leftJoinAndSelect('permissionUserType.permission', 'permission')
      .leftJoinAndSelect('permissionUserType.user_type', 'userType')
      .where('userType.name = :userType', { userType })
      .getMany();

    const userPermissions = permissions.map(p => p.permission.can);

    return requiredPermissions.every(permission => userPermissions.includes(permission));
  }
}