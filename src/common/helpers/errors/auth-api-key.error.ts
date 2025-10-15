//? Imports de codigo
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

//? Imports de usuario
import { BaseError } from '@common/helpers/errors/base';
import { ApiKeyErrorCodes } from '@authy/enums/errors';

@Injectable()
export class AuthsApiKeyError extends BaseError {
  notFound(): HttpException {
    return this.httpException(
      ApiKeyErrorCodes.NOT_FOUND,
      HttpStatus.UNAUTHORIZED,
      {
        cause:
          'The provided API Key was not found in our records. Please check your credentials and try again.',
      },
    );
  }

  invalid(): HttpException {
    return this.httpException(
      ApiKeyErrorCodes.INVALID,
      HttpStatus.UNAUTHORIZED,
      {
        cause:
          'The provided API Key is invalid. Please make sure it is correct and has the necessary permissions to access the resource.',
      },
    );
  }
}
