//? Imports de codigo
import { Request, Response } from 'express';
import { mongo } from 'mongoose';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

//? Imports de usuario
import { FilterException } from '@common/interfaces';

@Catch(mongo.MongoServerError)
export class MongooseExceptionFilter
  implements ExceptionFilter<mongo.MongoServerError>
{
  catch(exception: mongo.MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { url, method } = request;
    const { message, name, stack, ...additionalException } = exception;

    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;

    //? If the response has already been sent, we do nothing in the filter
    if (response.headersSent) return;

    switch (exception.code) {
      case 11000:
      case 11001:
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      case 2:
        statusCode = HttpStatus.NOT_FOUND;
        break;
      case 11007:
        statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    const error: FilterException = {
      message,
      name,
      statusCode,
      method,
      url,
      timestamp: new Date().toISOString(),
      additionalException,
      stack,
    };

    return response.status(statusCode).json(error);
  }
}
