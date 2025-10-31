//? Imports de codigo
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

//? Imports de usuario
import { FilterException } from '@common/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const { url, method } = request;
    const { message, name, stack, cause, ...additionalException } = exception;

    //? If the response has already been sent, we do nothing in the filter
    if (response.headersSent) return;

    const responseAdditionalException = additionalException['response'];

    delete additionalException['response'];

    const error: FilterException = {
      message,
      name,
      statusCode,
      cause,
      method,
      url,
      timestamp: new Date().toISOString(),
      additionalException: {
        response: responseAdditionalException.response,
        locator: responseAdditionalException.locator,
        ...additionalException,
      },
      stack,
    };

    return response.status(statusCode).json(error);
  }
}
