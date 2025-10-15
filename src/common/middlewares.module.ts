//? Imports de codigo
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';

//? Imports de usuario

//* Module
import { LoggerModule } from '@logger/logger.module';
import { SnifferModule } from '@sniffer/sniffer.module';

//* Interceptors
import { ResponseInterceptor, SnifferInterceptor } from '@common/interceptors';

//* Guards
import { ApiKeyGuard } from '@authy/guards';

//* Filters
import {
  GeneralExceptionsFilter,
  HttpExceptionFilter,
  MongooseExceptionFilter,
} from '@common/filters';

import { AuthsApiKeyError } from './helpers/errors';

@Global()
@Module({
  imports: [
    //? Modules
    LoggerModule,
    SnifferModule,
  ],

  controllers: [],

  providers: [
    //? Errors
    AuthsApiKeyError,

    //? Interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: SnifferInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },

    //? Guards
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },

    //? Filters
    {
      provide: APP_FILTER,
      useClass: GeneralExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: MongooseExceptionFilter,
    },
  ],
})
export class MiddlewaresModule {}
