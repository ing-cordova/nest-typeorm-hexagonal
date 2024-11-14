// src/context/guards/permissions.guard.ts
import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PermissionService } from '../services/permissions.service';
import { Injectable } from '../shared/dependency-injection/injectable';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
    private jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as any;
    const userType = decodedToken.user_type;

    const hasPermission = await this.permissionService.userTypeHasPermissions(userType, requiredPermissions);

    if (!hasPermission) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return hasPermission;
  }
}