//? Imports de codigo
import { SetMetadata } from '@nestjs/common';

//? Imports de usuario
import { UsersRoles } from '@users/enums';

export const ValidRoles = (roles: UsersRoles[] | UsersRoles) =>
  SetMetadata('roles', roles);
