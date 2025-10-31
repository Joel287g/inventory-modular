//? Imports de codigo
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from '@nestjs/jwt';

//? Imports de usuario
import { JwtErrorCodes } from '@authy/enums/errors';
import { BaseError } from '@common/helpers/errors/base';
import { LoggerJwt } from '@logger/enums';

@Injectable()
export class AuthsJwtError extends BaseError {
  build(error: any) {
    let message: string;
    let jwtErrorCodes: JwtErrorCodes;

    switch (true) {
      //? TokenExpiredError
      case error instanceof TokenExpiredError:
        message = LoggerJwt.EXPIRED;
        jwtErrorCodes = JwtErrorCodes.EXPIRED;
        break;

      //? NotBeforeError
      case error instanceof NotBeforeError:
        message = LoggerJwt.NOT_BEFORE;
        jwtErrorCodes = JwtErrorCodes.NOT_BEFORE;
        break;

      //? JsonWebTokenError;
      case error instanceof JsonWebTokenError:
        if (error.message === 'jwt must be provided') {
          message = LoggerJwt.NOT_FOUND;
          jwtErrorCodes = JwtErrorCodes.NOT_FOUND;
        } else if (error.message === 'jwt malformed') {
          message = LoggerJwt.MALFORMED;
          jwtErrorCodes = JwtErrorCodes.MALFORMED;
        } else if (error.message === 'invalid signature') {
          message = LoggerJwt.INVALID_SIGNATURE;
          jwtErrorCodes = JwtErrorCodes.INVALID_SIGNATURE;
        } else {
          message = LoggerJwt.JSON_WEB_TOKEN;
          jwtErrorCodes = JwtErrorCodes.JSON_WEB_TOKEN;
        }
        break;

      //? Another
      default:
        message = LoggerJwt.ANOTHER;
        jwtErrorCodes = JwtErrorCodes.ANOTHER;
    }

    return {
      message,
      jwtErrorCodes,
    };
  }

  error(jwtErrorCode: JwtErrorCodes): HttpException {
    let cause: string;

    switch (jwtErrorCode) {
      case JwtErrorCodes.NOT_FOUND:
        cause = 'The provided token was not found in our records.';
        break;
      case JwtErrorCodes.EXPIRED:
        cause = 'The token has expired. Please log in again to continue.';
        break;
      case JwtErrorCodes.NOT_BEFORE:
        cause =
          'The token has a future date set as "not before". Please check the token configuration.';
        break;
      case JwtErrorCodes.JSON_WEB_TOKEN:
        cause = 'The provided token is not a valid JSON Web Token.';
        break;
      case JwtErrorCodes.MALFORMED:
        cause =
          'The provided token is malformed or has an incorrect structure.';
        break;
      case JwtErrorCodes.ANOTHER:
        cause = 'An unexpected error occurred with the provided token.';
        break;
      case JwtErrorCodes.INVALID_SIGNATURE:
        cause =
          'The token has an invalid signature. Please check the token or your credentials.';
        break;
    }

    return this.httpException(
      'COMM-HEL-ERR-AUTH_JWT-001',
      jwtErrorCode,
      HttpStatus.UNAUTHORIZED,
      { cause },
    );
  }
}
