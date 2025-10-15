//? Imports de codigo
import { Model, Types } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

//? Imports de usuario
import { environmentsConfig } from '@configuration/env';

import { JwtPayload } from '@authy/interfaces';

import { Users } from '@users/schemas';
import { UsersStatus } from '@users/enums';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(environmentsConfig.KEY)
    configService: ConfigType<typeof environmentsConfig>,
    @InjectModel(Users.name)
    private readonly usersModel: Model<Users>,
  ) {
    super({
      secretOrKey: configService.security.jwt.secret,
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    });
  }

  async validate({ _id, ...payload }: JwtPayload) {
    const user = await this.usersModel.findById(new Types.ObjectId(_id));

    if (!user) throw new UnauthorizedException('Invalid token');

    if (user.status === UsersStatus.INACTIVE)
      throw new UnauthorizedException('Inactive user');

    return user;
  }
}
