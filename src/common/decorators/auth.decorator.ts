//? Imports de codigo
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//? Imports de usuario
import { ValidRoles } from '@common/decorators';
import { UserRoleGuard } from '@authy/guards';
import { UsersRoles } from '@users/enums';

export function Auth(roles: UsersRoles[] | UsersRoles) {
  return applyDecorators(
    ValidRoles(roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
