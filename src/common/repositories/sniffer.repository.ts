//? Imports de codigo
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//? Imports de usuario
import { BaseRepository } from '@common/repositories/base';
import { Sniffer } from '@sniffer/schemas/sniffer.schemas';

@Injectable()
export class SnifferRepository extends BaseRepository<Sniffer> {
  constructor(
    @InjectModel(Sniffer.name)
    private readonly snifferModel: Model<Sniffer>,
  ) {
    super(snifferModel);
  }
}
