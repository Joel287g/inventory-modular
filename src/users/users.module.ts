//? Imports de codigo
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//? Imports de usuario
import { Users, UsersSchema } from '@users/schemas';

import { UsersError } from '@common/helpers/errors';
import { UsersRepository } from '@common/repositories';
import { MongoDBUsersRepository } from '@common/repositories/mongo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],

  controllers: [],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongoDBUsersRepository,
    },

    //? Errors
    UsersError,

    //? Services
  ],
})
export class UsersModule {}
