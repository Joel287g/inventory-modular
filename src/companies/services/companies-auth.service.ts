//? Imports de codigo
import { Injectable } from '@nestjs/common';

//? Imports de usuario
import {
  CompaniesRepository,
  UsersRepository,
} from '@main/common/repositories';
import { CompaniesError, UsersError } from '@main/common/helpers/errors';

import { CompaniesAuthCreateDto } from '@companies/dtos';

@Injectable()
export class CompaniesAuthService {
  constructor(
    private readonly companiesRepository: CompaniesRepository,
    private readonly companiesError: CompaniesError,

    private readonly usersRepository: UsersRepository,
    private readonly usersError: UsersError,
  ) {}

  async create({ ownerId, name, address }: CompaniesAuthCreateDto) {
    try {
      const isUserExist: Boolean = await this.usersRepository.exists(ownerId);

      if (!isUserExist)
        throw this.usersError.notFound('COMP-SER-COMP_AUTH-001');

      const isCompanyNameExist: Boolean =
        !!(await this.companiesRepository.findByName(name));

      if (isCompanyNameExist)
        throw this.companiesError.conflict('COMP-SER-COMP_AUTH-002');

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
