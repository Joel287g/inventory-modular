//? Imports de codigo
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

//? Imports de usuario
import { environmentsConfig } from '@configuration/env';
import { JwtPayload } from '@common/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(environmentsConfig.KEY)
    configService: ConfigType<typeof environmentsConfig>,
  ) {
    super({
      secretOrKey: configService.security.jwt.secret,
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
