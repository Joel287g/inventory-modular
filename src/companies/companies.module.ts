//? Imports de codigo
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//? Imports de usuario
import { Companies, CompaniesSchema } from '@companies/schemas';

import { CompaniesError } from '@common/helpers/errors';
import { CompaniesRepository } from '@common/repositories';
import { MongoDBCompaniesRepository } from '@common/repositories/mongo';

import { CompaniesAuthController } from '@companies/controllers';
import { CompaniesAuthService } from '@companies/services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Companies.name, schema: CompaniesSchema },
    ]),
  ],
  controllers: [CompaniesAuthController],
  providers: [
    {
      provide: CompaniesRepository,
      useClass: MongoDBCompaniesRepository,
    },

    //? Errors
    CompaniesError,

    //? Services
    CompaniesAuthService,
  ],
})
export class CompaniesModule {}
