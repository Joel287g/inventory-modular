//? Imports de codigo
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//? Imports de usuario
import { LoggerRepository } from '@common/repositories';
import { Logger, LoggerSchema } from '@logger/schemas/logger.schemas';
import { LoggerService } from '@logger/services/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logger.name, schema: LoggerSchema }]),
  ],
  controllers: [],
  providers: [LoggerRepository, LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
