//? Imports de codigo
import { ClientSession, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';

//? Imports de usuario
import { UsersRepository } from '@main/common/repositories';
import { AuthService } from '@main/auth/services/jwt.service';
import { UsersError } from '@main/common/helpers/errors';

import { UsersAuthCreateOwnerDto } from '@users/dtos';
import { Phone } from '@main/common/schemas';
import { UsersRoles } from '../enums';

@Injectable()
export class UsersAuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersError: UsersError,

    private readonly authService: AuthService,
  ) {}

  async createOwner({ name, lastName, email, phone }: UsersAuthCreateOwnerDto) {
    try {
      const user = await this.usersRepository.create({
        uid: null,
        name,
        lastName,
        email,
        phone,
        role: UsersRoles.OWNER,
      } as any);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
