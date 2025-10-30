//? Imports de codigo
import { Injectable } from '@nestjs/common';

//? Imports de usuario
import { BaseRepositoryInterface } from '@common/repositories/base';

import { Companies } from '@companies/schemas';

@Injectable()
export abstract class CompaniesRepository extends BaseRepositoryInterface<Companies> {
  abstract findByName(name: string): Promise<Companies>;

}
