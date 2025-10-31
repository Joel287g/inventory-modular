//? Imports de codigo
import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export abstract class BaseError {
  protected httpException(
    locator: string = 'COMM-HEL-ERR-BAS-BASE_ERRO-001',
    objectOrError: string | object | any,
    status: HttpStatus,
    descriptionOrOptions: HttpExceptionOptions,
  ): HttpException {
    if (
      locator.length === 0 ||
      locator === undefined ||
      locator === null ||
      locator === ''
    ) {
      locator = 'COMM-HEL-ERR-BAS-BASE_ERRO-002';
    }

    throw new HttpException(
      { response: objectOrError, locator },
      status,
      descriptionOrOptions,
    );
  }
}
