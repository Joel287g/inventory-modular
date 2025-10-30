//? Imports de codigo
import { Injectable } from '@nestjs/common';

//? Imports de usuario
import { BaseRepositoryInterface } from '@common/repositories/base';

import { Users } from '@users/schemas';

@Injectable()
export abstract class UsersRepository extends BaseRepositoryInterface<Users> {
 abstract findByUid(uid: string): Promise<Users>;
}
