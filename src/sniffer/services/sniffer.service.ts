//? Imports de codigo
import { Injectable } from '@nestjs/common';

//? Imports de codigo
import { SnifferRepository } from '@common/repositories';
import { SnifferCreateDto } from '@sniffer/dtos';

@Injectable()
export class SnifferService {
  constructor(private SnifferRepository: SnifferRepository) {}

  async create(payload: SnifferCreateDto) {
    return await this.SnifferRepository.create(payload);
  }
}
