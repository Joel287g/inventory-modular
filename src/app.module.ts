//? Imports de codigo
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

//? Imports de usuario
//* Environments config
import {
  environmentsConfig,
  environments,
  environmentsValidations,
} from '@configuration/env';

//* Database
import { MongooseConfigService } from '@configuration/database/mongoose.database';

//* Modules
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    //* ENVIROMENTS
    ConfigModule.forRoot({
      //? Set path of the .env
      envFilePath: environments[process.env.NODE_ENV],

      //? Load config
      load: [environmentsConfig],

      //? Expand Variables
      expandVariables: true,

      //? Set global environments
      isGlobal: true,

      //? Validation environments variables
      validationSchema: environmentsValidations,
    }),

    //* DATABASE
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),

    //* MODULES
    UsersModule
  ],

  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
