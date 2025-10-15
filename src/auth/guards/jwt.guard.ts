//? Imports de codigo
import { Observable } from 'rxjs';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

//? Imports de usuario
import { GuardsDecorators } from '@common/enums';
import { extractHeader } from '@common/helpers/functions';
import { AuthsJwtError } from '@common/helpers/errors';

import { JwtErrorCodes } from '@authy/enums/errors';

import { LoggerService } from '@logger/services/logger.service';
import { LoggerTypes } from '@logger/enums';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
    private readonly reflector: Reflector,
    private readonly authsJwtError: AuthsJwtError,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //? Check is public key value
    const isPublicJwt = this.reflector.get(
      GuardsDecorators.IS_PUBLIC_JWT,
      context.getHandler(),
    );

    //? Is public
    if (isPublicJwt) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = extractHeader(request, 'authorization');

    return this.jwtService
      .verifyAsync(authorization)
      .then((data) => data)
      .catch(async (error) => {
        let { message, jwtErrorCodes } = this.authsJwtError.build(error);

        const isErrorLog: boolean =
          jwtErrorCodes === JwtErrorCodes.JSON_WEB_TOKEN ||
          jwtErrorCodes === JwtErrorCodes.ANOTHER ||
          jwtErrorCodes === JwtErrorCodes.INVALID_SIGNATURE;

        const data = this.loggerService.generateData(request, error);

        this.loggerService[isErrorLog ? 'error' : 'warning']({
          type: LoggerTypes.JWT,
          message,
          data,
        });

        this.authsJwtError.error(jwtErrorCodes);
      });
  }
}
