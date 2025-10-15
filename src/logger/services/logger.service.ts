//? Imports de codigo
import { Injectable, Logger } from '@nestjs/common';

//? Imports de codigo
import { LoggerRepository } from '@common/repositories';
import { extractHeaders } from '@common/helpers/functions';

import { LoggerCreateDto } from '@logger/dtos';
import { LoggerLevel } from '@logger/enums';
import { LoggerData } from '@logger/interfaces';

@Injectable()
export class LoggerService {
  private logger: Logger;
  private context: string;

  constructor(private readonly loggerRepository: LoggerRepository) {
    this.context = 'LoggerModule';
    this.logger = new Logger(this.context);
  }

  private generateLog(
    level: LoggerLevel,
    log: LoggerCreateDto,
    contextDetail: string[] = [],
  ) {
    const context = [this.context, ...contextDetail].join('-');
    const logger = contextDetail.length > 0 ? new Logger(context) : this.logger;

    logger[level.toLowerCase()](
      log.message,
      JSON.stringify(log.data).slice(0, 2000),
    );

    this.loggerRepository.create({ ...log, level });
  }

  public generateData(request: any, error?: any): LoggerData {
    const headers = request.headers;
    const [apiKey, userAgent, ip, ip2, referer, appVersion, authorization] =
      extractHeaders(request, [
        'x-api-key',
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

    let loggerData: LoggerData = {
      url: [request.url, request.baseUrl].join(''),
      ip: ip || ip2 || request.ip || 'unknown',
      request: body,
      headers,
      method,
      userAgent,
      referer,
      appVersion,
      apiKey,
      error,
    };

    return loggerData;
  }

  async error(log: LoggerCreateDto, ...contextDetail: string[]) {
    const level: LoggerLevel = LoggerLevel.ERROR;

    this.generateLog(level, log, contextDetail);
  }

  async log(log: LoggerCreateDto, ...contextDetail: string[]) {
    const level: LoggerLevel = LoggerLevel.LOG;

    this.generateLog(level, log, contextDetail);
  }

  async warning(log: LoggerCreateDto, ...contextDetail: string[]) {
    const level: LoggerLevel = LoggerLevel.WARN;

    this.generateLog(level, log, contextDetail);
  }

  async debug(log: LoggerCreateDto, ...contextDetail: string[]) {
    const level: LoggerLevel = LoggerLevel.DEBUG;

    this.generateLog(level, log, contextDetail);
  }

  async verbose(log: LoggerCreateDto, ...contextDetail: string[]) {
    const level: LoggerLevel = LoggerLevel.VERBOSE;

    this.generateLog(level, log, contextDetail);
  }

  async fatal(log: LoggerCreateDto, ...contextDetail: string[]) {
    const level: LoggerLevel = LoggerLevel.FATAL;

    this.generateLog(level, log, contextDetail);
  }
}
