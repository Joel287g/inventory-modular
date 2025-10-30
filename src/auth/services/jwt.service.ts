//? Imports de codigo
import { Global, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

//? Imports de usuario
import { Users } from '@users/schemas';

@Global()
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(user: Users) {
    return this.jwtService.sign({
      _id: user._id,
      uid: user.uid,
      companyId: user.companyId,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  }
}
