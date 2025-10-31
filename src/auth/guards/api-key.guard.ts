//? Imports de codigo
import { Observable } from 'rxjs';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';

//? Imports de usuario
import { GuardsDecorators } from '@common/enums';
import { extractHeader } from '@common/helpers/functions';
import { AuthsApiKeyError } from '@common/helpers/errors';

import { environmentsConfig } from '@configuration/env';

import { LoggerTypes, LoggerApiKey } from '@logger/enums';
import { LoggerService } from '@logger/services/logger.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(environmentsConfig.KEY)
    private readonly configService: ConfigType<typeof environmentsConfig>,
    private readonly reflector: Reflector,
    private readonly loggerService: LoggerService,
    private readonly authsApiKeyError: AuthsApiKeyError,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //? Check is public key value
    const isPublicApiKey = !!this.reflector.get(
      GuardsDecorators.IS_PUBLIC_API_KEY,
      context.getHandler(),
    );

    //? Is public
    if (isPublicApiKey) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const apiKey = extractHeader(request, 'x-api-key');

    const data = this.loggerService.generateData(request);

    //? Not found
    if (!apiKey) {
      //? Generate log warning
      this.loggerService.warning({
        type: LoggerTypes.API_KEY,
        message: LoggerApiKey.NOT_FOUND,
        data,
      });

      this.authsApiKeyError.notFound('AUTH-GUA-API_KEY-001');
    }

    //? Invalid
    if (apiKey !== this.configService.security.apiKey) {
      //? Generate error log
      this.loggerService.error({
        type: LoggerTypes.API_KEY,
        message: LoggerApiKey.INVALID,
        data,
      });

      this.authsApiKeyError.invalid('AUTH-GUA-API_KEY-002');
    }

    return true;
  }
}
