//? Imports de codigo
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';

//? Imports de usuario
import { extractHeaders } from '@common/helpers/functions';

import { SnifferService } from '@sniffer/services/sniffer.service';
import { SnifferCreateDto } from '@sniffer/dtos';

import { LoggerService } from '@logger/services/logger.service';
import { LoggerTypes, LoggerSniffer } from '@logger/enums';

@Injectable()
export class SnifferInterceptor implements NestInterceptor {
  constructor(
    private readonly snifferService: SnifferService,
    private readonly loggerService: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const now = Date.now();

      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();

      const headers = request.headers;
      const [userAgent, ip, ip2, referer, appVersion, authorization] =
        extractHeaders(request, [
          'user-agent',
          'client-ip',
          'x-forwarded-for',
          'referer',
          'app-version',
          'authorization',
        ]);

      const method = request.method;
      const content = method === 'GET' ? 'query' : 'body';
      const body = request[content];

      const statusCode = response.statusCode || 200;

      const snifferData: SnifferCreateDto = {
        auth: authorization,
        //TODO: userId: Get userId in the authorization token
        url: [request.url, request.baseUrl].join(''),
        ip: ip || ip2 || request.ip || 'unknown',
        request: body,
        response: null,
        headers,
        method,
        statusCode,
        processingTime: null,
        userAgent,
        referer,
        appVersion,
      };

      return next.handle().pipe(
        tap((response) => {
          snifferData.response = response;
          snifferData.processingTime = Date.now() - now;

          //? Generate log success
          this.loggerService.log({
            type: LoggerTypes.SNIFFER,
            message: LoggerSniffer.SUCCESS,
            data: snifferData,
          });

          //? Save data into sniffer
          this.snifferService.create(snifferData).catch((error) => {
            //? Generate error log
            this.loggerService.error({
              type: LoggerTypes.SNIFFER,
              message: LoggerSniffer.ERROR,
              data: error,
            });
          });
        }),
        catchError((error) => {
          snifferData.statusCode =
            error instanceof HttpException ? error.getStatus() : 500;
          snifferData.response = error;
          snifferData.processingTime = Date.now() - now;

          //? Generate log failure
          this.loggerService.log({
            type: LoggerTypes.SNIFFER,
            message: LoggerSniffer.FAILURE,
            data: snifferData,
          });

          //? Save data into sniffer
          this.snifferService.create(snifferData).catch((error) => {
            //? Generate error log
            this.loggerService.error({
              type: LoggerTypes.SNIFFER,
              message: LoggerSniffer.ERROR,
              data: error,
            });
          });

          return throwError(() => error);
        }),
      );
    } catch (error) {
      //? Generate error log
      this.loggerService.error({
        type: LoggerTypes.SNIFFER,
        message: LoggerSniffer.ERROR,
        data: error,
      });
    }
  }
}
