//? Imports de codigo
import { ClientSession, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';

//? Imports de usuario
import { UsersRepository } from '@main/common/repositories';
import { AuthService } from '@main/auth/services/jwt.service';
import { UsersError } from '@main/common/helpers/errors';

import { UsersAuthCreateOwnerDto } from '@users/dtos';
import { Phone } from '@main/common/schemas';

@Injectable()
export class CompaniesAuthService {}
