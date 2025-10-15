//? Imports de codigo
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

//? Imports de usuario
import { UsersRoles } from '@users/enums';
import { Users } from '@users/schemas';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: UsersRoles[] = this.reflector.get(
      'roles',
      context.getHandler(),
    );

    if (!validRoles || validRoles.length == 0) return true;

    const request = context.switchToHttp().getRequest();
    const user: Users = request.user;

    if (!user) {
      throw new InternalServerErrorException('User not found in request');
    }

    if (validRoles.includes(user.role)) return true;

    throw new ForbiddenException('User need a valid role');
  }
}
