//? Imports de codigo
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//? Imports de usuario
import { Users, UsersSchema } from '@users/schemas';
import { Companies, CompaniesSchema } from '@companies/schemas';

import { CompaniesError, UsersError } from '@common/helpers/errors';
import { UsersRepository, CompaniesRepository } from '@common/repositories';
import {
  MongoDBUsersRepository,
  MongoDBCompaniesRepository,
} from '@common/repositories/mongo';

import { UsersAuthController } from '@users/controllers';
import { UsersAuthService } from '@users/services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MongooseModule.forFeature([
      { name: Companies.name, schema: CompaniesSchema },
    ]),
  ],

  controllers: [UsersAuthController],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongoDBUsersRepository,
    },
    {
      provide: CompaniesRepository,
      useClass: MongoDBCompaniesRepository,
    },

    //? Errors
    UsersError,
    CompaniesError,

    //? Services
    UsersAuthService,
  ],
})
export class UsersModule {}
