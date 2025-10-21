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

//* Middlewares
import { MiddlewaresModule } from '@common/middlewares.module';

//* Modules
import { AuthModule } from '@authy/auth.module';
import { SnifferModule } from '@sniffer/sniffer.module';

import { UsersModule } from '@users/users.module';
import { CompaniesModule } from '@companies/companies.module';

//* Services
import { AuthService } from '@authy/services/jwt.service';

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

    //* MIDDLEWARES
    MiddlewaresModule,

    //* MODULES
    AuthModule,
    SnifferModule,

    UsersModule,
    CompaniesModule
  ],

  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AppModule {}
