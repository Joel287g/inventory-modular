//? Imports de codigo
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//? Imports de usuario
import { BaseRepository } from '@common/repositories/base';
import { CompaniesRepository } from '@common/repositories';

import { Companies } from '@companies/schemas';

@Injectable()
export class MongoDBCompaniesRepository
  extends BaseRepository<Companies>
  implements CompaniesRepository
{
  constructor(
    @InjectModel(Companies.name)
    private readonly companiesModel: Model<Companies>,
  ) {
    super(companiesModel);
  }

  findByName(name: string): Promise<Companies> {
    return this.companiesModel.findOne({ name });
  }
}
