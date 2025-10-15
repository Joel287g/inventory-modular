//? Imports de codigo
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//? Imports de usuario
import { BaseRepository } from '@common/repositories/base';
import { Logger } from '@logger/schemas/logger.schemas';

@Injectable()
export class LoggerRepository extends BaseRepository<Logger> {
  constructor(
    @InjectModel(Logger.name)
    private readonly loggerModel: Model<Logger>,
  ) {
    super(loggerModel);
  }
}
