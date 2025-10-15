//? Imports de codigo
import { Types } from 'mongoose';

//? Imports de usuario
import { UsersStatus } from '@users/enums';

import { Phone } from '@common/interfaces';

export interface JwtPayload {
  _id: string | Types.ObjectId;
  ownerId: string | Types.ObjectId;
  companyId: string | Types.ObjectId;
  uid: string;
  name: string;
  lastName: string;
  email: string;
  phone: Phone;
  dni: string;
  status: UsersStatus;
  modules: {};
}
