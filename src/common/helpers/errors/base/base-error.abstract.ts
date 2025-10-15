//? Imports de codigo
import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export abstract class BaseError {
  protected httpException(
    objectOrError: string | object | any,
    status: HttpStatus,
    descriptionOrOptions: HttpExceptionOptions,
  ): HttpException {
    throw new HttpException(objectOrError, status, descriptionOrOptions);
  }
}
