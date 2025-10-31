//? Imports de codigo
import {
  HttpExceptionOptions,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';

//? Imports de usuario
import { BaseError, BaseErrorInterface } from '@common/helpers/errors/base';

const subject: String = 'Company';
const subjects: String = 'Companies';

@Injectable()
export class CompaniesError extends BaseError implements BaseErrorInterface {
  badRequest(
    locator: string,
    objectOrError: any = 'A bad request has been received. Please check your payload and try again.',
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException {
    return this.httpException(
      locator,
      objectOrError,
      HttpStatus.BAD_REQUEST,
      descriptionOrOptions,
    );
  }

  notFound(
    locator: string,
    objectOrError: any = `${subject} not found`,
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException {
    return this.httpException(
      locator,
      objectOrError,
      HttpStatus.NOT_FOUND,
      descriptionOrOptions,
    );
  }

  conflict(
    locator: string,
    objectOrError: any = `${subject} with conflict`,
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException {
    return this.httpException(
      locator,
      objectOrError,
      HttpStatus.CONFLICT,
      descriptionOrOptions,
    );
  }

  internalServerError(
    locator: string,
    objectOrError: any = 'An internal server error occurred',
    descriptionOrOptions?: HttpExceptionOptions,
  ): HttpException {
    return this.httpException(
      locator,
      objectOrError,
      HttpStatus.INTERNAL_SERVER_ERROR,
      descriptionOrOptions,
    );
  }
}
