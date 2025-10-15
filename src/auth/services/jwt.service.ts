//? Imports de codigo
import { Global, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//? Imports de usuario
import { Users } from '@users/schemas';

@Global()
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
}
