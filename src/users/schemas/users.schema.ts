//? Imports de codigo
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

//? Imports de usuario
import { Collections } from '@common/enums';
import { Phone, PhoneSchema } from '@common/schemas';

import {
  UsersRoles,
  UsersStatus,
  Positions,
  AccountTypes,
  Genders,
} from '@users/enums';

@Schema({
  _id: true,
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: false, getters: true },
  collection: Collections.USERS,
})
export class Users extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: false, type: String, unique: true, sparse: true })
  uid: string;

  @Prop({ required: true, type: [Types.ObjectId], default: [] })
  companyId: Types.ObjectId[];

  @Prop({ required: false, type: String })
  name: string;

  @Prop({ required: false, type: String })
  lastName: string;

  @Prop({
    required: false,
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    sparse: true,
  })
  email: string;

  @Prop({ required: false, type: PhoneSchema, default: {} })
  phone: Phone;

  @Prop({ required: false, type: String, enum: Genders })
  gender: Genders;

  @Prop({ required: false, type: String, enum: Positions })
  position: Positions;

  @Prop({ required: false, type: String })
  workArea: String;

  @Prop({
    required: true,
    type: String,
    enum: AccountTypes,
    default: AccountTypes.PERSONAL,
  })
  accountType: AccountTypes;

  @Prop({
    required: true,
    type: String,
    enum: UsersRoles,
    default: UsersRoles.OPERATOR,
  })
  role: UsersRoles;

  @Prop({
    required: true,
    type: String,
    enum: UsersStatus,
    default: UsersStatus.PENDING,
  })
  status: UsersStatus;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
