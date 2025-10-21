//? Imports de codigo
import { Injectable } from '@nestjs/common';

//? Imports de usuario
import { CompaniesRepository } from '@main/common/repositories';
import { CompaniesError } from '@main/common/helpers/errors';

import { CompaniesAuthCreateDto } from '@companies/dtos';
import { Types } from 'mongoose';

@Injectable()
export class CompaniesAuthService {
  constructor(
    private readonly companiesRepository: CompaniesRepository,
    private readonly companiesError: CompaniesError,
  ) {}

  async create({ ownerId, name, address }: CompaniesAuthCreateDto) {
    try {
      const company = await this.companiesRepository.create({
        ownerId,
        name,
        address,
      });

      return company;
    } catch (error) {
      throw error;
    }
  }
}
