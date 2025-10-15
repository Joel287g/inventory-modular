//? Imports de codigo
import { APP_GUARD } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

//? Imports de usuario
//* Modules
import { LoggerModule } from '@logger/logger.module';
import { JwtModule } from '@nestjs/jwt';

//* Configurations
import { JwtConfigService } from '@configuration/security';

//* Guards
import { JwtAuthGuard } from '@authy/guards';

//* Strategies
import { JwtStrategy } from '@authy/strategies';

//* Services
import { AuthService } from '@authy/services/jwt.service';

//* Schemas
import { Users, UsersSchema } from '@users/schemas';

//* Helpers
import { AuthsApiKeyError, AuthsJwtError } from '@common/helpers/errors';

@Global()
@Module({
  imports: [
    //? Passport authentication
    PassportModule.register({ defaultStrategy: 'jwt' }),

    //? JWT authentication
    JwtModule.registerAsync({
      imports: [
        LoggerModule,

        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
      ],
      useClass: JwtConfigService,
      extraProviders: [
        AuthsJwtError,
        JwtStrategy,
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
    }),
  ],

  providers: [
    //? Errors
    AuthsApiKeyError,

    //? Services
    AuthService,
  ],

  exports: [JwtModule, AuthService, PassportModule, JwtModule],
})
export class AuthModule {}
