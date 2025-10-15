//? Imports de codigo
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//? Importsd de usuario
import { SnifferRepository } from '@common/repositories';

import { Sniffer, SnifferSchema } from '@sniffer/schemas/sniffer.schemas';
import { SnifferService } from '@sniffer/services/sniffer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sniffer.name, schema: SnifferSchema }]),
  ],
  controllers: [],
  providers: [SnifferRepository, SnifferService],
  exports: [SnifferService],
})
export class SnifferModule {}
