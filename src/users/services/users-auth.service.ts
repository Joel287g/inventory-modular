//? Imports de codigo
import { Injectable } from '@nestjs/common';

//? Imports de usuario
import {
  UsersRepository,
  CompaniesRepository,
} from '@main/common/repositories';
import { AuthService } from '@main/auth/services/jwt.service';
import { CompaniesError, UsersError } from '@main/common/helpers/errors';

import {
  UsersAuthAddCompanyDto,
  UsersAuthCreateOwnerDto,
  UsersAuthLoginDto,
} from '@users/dtos';
import { UsersRoles } from '@users/enums';

import { Users } from '@users/schemas';

@Injectable()
export class UsersAuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly companiesRepository: CompaniesRepository,

    private readonly usersError: UsersError,
    private readonly companiesError: CompaniesError,

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

  async addCompany(
    { _id: userId }: Users,
    { companyId, ownerId }: UsersAuthAddCompanyDto,
  ) {
    try {
      const user: Users = await this.usersRepository.findById(
        ownerId || userId,
      );

      if (!user) throw this.usersError.notFound();

      const isCompanyExist: Boolean =
        await this.companiesRepository.exists(companyId);

      if (!isCompanyExist) throw this.companiesError.notFound();

      const isCompanyExistIntoUser: Boolean = !!user.companyId.find(
        (id) => id.toString() === companyId.toString(),
      );

      if (isCompanyExistIntoUser) throw this.usersError.companyAlreadyExist();

      user.companyId.push(companyId);

      return await user.save();
    } catch (error) {
      throw error;
    }
  }
}
