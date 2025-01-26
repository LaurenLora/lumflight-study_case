import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    console.log('required:', requiredRoles);

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User:', user);

    if (!user || !user.role) {
      console.error('User or role is undefined');
      return false;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
