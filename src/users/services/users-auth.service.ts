//? Imports de codigo
import { Injectable } from '@nestjs/common';

//? Imports de usuario
import { UsersRepository } from '@main/common/repositories';
import { AuthService } from '@main/auth/services/jwt.service';
import { UsersError } from '@main/common/helpers/errors';

import { UsersAuthCreateOwnerDto, UsersAuthLoginDto } from '@users/dtos';
import { UsersRoles } from '@users/enums';

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

  async login({ uid }: UsersAuthLoginDto) {
    try {
      const user = await this.usersRepository.findByUid(uid);

      if (!user) throw this.usersError.notFound();

      const jwtToken = this.authService.sign(user);

      return { user, jwtToken };
    } catch (error) {
      throw error;
    }
  }
}
