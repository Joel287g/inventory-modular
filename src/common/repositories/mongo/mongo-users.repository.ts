//? Imports de codigo
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//? Imports de usuario
import { BaseRepository } from '@common/repositories/base';
import { UsersRepository } from '@common/repositories';

import { Users } from '@users/schemas';

@Injectable()
export class MongoDBUsersRepository
  extends BaseRepository<Users>
  implements UsersRepository
{
  constructor(
    @InjectModel(Users.name)
    private readonly usersModel: Model<Users>,
  ) {
    super(usersModel);
  }
}
