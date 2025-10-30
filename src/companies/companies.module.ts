//? Imports de codigo
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//? Imports de usuario
import { Companies, CompaniesSchema } from '@companies/schemas';
import { Users, UsersSchema } from '@users/schemas';

import { CompaniesError, UsersError } from '@common/helpers/errors';
import { CompaniesRepository, UsersRepository } from '@common/repositories';
import {
  MongoDBCompaniesRepository,
  MongoDBUsersRepository,
} from '@common/repositories/mongo';

import { CompaniesAuthController } from '@companies/controllers';
import { CompaniesAuthService } from '@companies/services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Companies.name, schema: CompaniesSchema },
      { name: Users.name, schema: UsersSchema },
    ]),
  ],
  controllers: [CompaniesAuthController],
  providers: [
    {
      provide: CompaniesRepository,
      useClass: MongoDBCompaniesRepository,
    },
    {
      provide: UsersRepository,
      useClass: MongoDBUsersRepository,
    },

    //? Errors
    CompaniesError,
    UsersError,

    //? Services
    CompaniesAuthService,
  ],
})
export class CompaniesModule {}
