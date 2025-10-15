//? Imports de codigo
import { JwtService } from '@nestjs/jwt';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

//? Imports de usuario
import { version } from '../../../package.json';

import { extractHeader } from '@common/helpers/functions';
import { JwtPayload } from '@authy/interfaces';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const authorization = extractHeader(request, 'authorization');

    let token: string = null;

    if (authorization) {
      const authToken: JwtPayload = this.jwtService.decode(authorization);

      delete authToken['iat'];
      delete authToken['exp'];
      delete authToken['aud'];

      token = this.jwtService.sign(authToken);
    }

    return next.handle().pipe(
      tap((responseData) => {
        //? Extraemos el JWT token del body si se extrae
        if (responseData?.jwtToken) {
          token = responseData.jwtToken;
          delete responseData.jwtToken;
        }

        const data = {
          version,
          status: response.statusCode,
          message: response.message ?? null,
          data: responseData ?? {},
          token,
          timestamp: Date.now(),
        };

        response.status(response.statusCode).json(data);
      }),
    );
  }
}
