//? Imports de codigo
import {
  HttpExceptionOptions,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';

//? Imports de usuario
import { BaseError, BaseErrorInterface } from '@common/helpers/errors/base';

@Injectable()
export class UsersError extends BaseError implements BaseErrorInterface {
  badRequest(
    objectOrError: any = 'A bad request has been received. Please check your payload and try again.',
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException {
    return this.httpException(
      objectOrError,
      HttpStatus.BAD_REQUEST,
      descriptionOrOptions,
    );
  }

  notFound(
    objectOrError: any = 'User not found',
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException {
    return this.httpException(
      objectOrError,
      HttpStatus.NOT_FOUND,
      descriptionOrOptions,
    );
  }

  conflict(
    objectOrError: any = 'User with conflict',
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException {
    return this.httpException(
      objectOrError,
      HttpStatus.CONFLICT,
      descriptionOrOptions,
    );
  }

  internalServerError(
    objectOrError: any = 'An internal server error occurred',
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException {
    return this.httpException(
      objectOrError,
      HttpStatus.INTERNAL_SERVER_ERROR,
      descriptionOrOptions,
    );
  }
}
