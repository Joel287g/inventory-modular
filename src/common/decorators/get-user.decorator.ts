//? Imports de codigo
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

//? Imports de usuario
import { UsersError } from '@common/helpers/errors';

export const GetUser = createParamDecorator(
  (data: string | string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return new UsersError().internalServerError('User not found in request');
    }

    data = (Array.isArray(data) ? data : [data]).filter(
      (value) => value !== undefined,
    );

    const userProperties = data.map((property) => ({
      [property]: user[property],
    }));

    if (data.length === 0) return user;

    return userProperties.length === 1
      ? Object.values(userProperties[0])[0]
      : Object.assign({}, ...userProperties);
  },
);
