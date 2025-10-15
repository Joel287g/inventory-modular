//? Imports de codigo
import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export abstract class BaseErrorInterface {
  abstract badRequest(
    objectOrError?: string | object | any,
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException;
  abstract notFound(
    objectOrError?: string | object | any,
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException;
  abstract conflict(
    objectOrError?: string | object | any,
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException;
  abstract internalServerError(
    objectOrError?: string | object | any,
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException;
  
}
