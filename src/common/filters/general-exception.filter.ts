//? Imports de codigo
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';

//? Imports de usuario
import { FilterException } from '@common/interfaces';

@Catch()
export class GeneralExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    const { url, method } = request;
    const message = exception['message'];
    const name = exception['name'];
    const stack = exception['stack'];
    const cause = exception['cause'];

    // //? If the response has already been sent, we do nothing in the filter
    if (response.headersSent) return;

    const error: FilterException = {
      message,
      name,
      statusCode,
      cause,
      method,
      url,
      timestamp: new Date().toISOString(),
      stack,
    };

    httpAdapter.reply(ctx.getResponse(), error, statusCode);
  }
}
