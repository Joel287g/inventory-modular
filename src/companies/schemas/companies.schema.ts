//? Imports de codigo
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

//? Imports de usuario
import { Collections } from '@common/enums';

import { CompaniesLocations } from '@companies/schemas';
import { CompaniesStatus } from '@companies/enums';

@Schema({
  _id: true,
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: false, getters: true },
  collection: Collections.COMPANIES,
})
export class Companies extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  ownerId: Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: false, type: String, trim: true })
  address: string;

  @Prop({ required: true, type: [CompaniesLocations], default: [] })
  locations: CompaniesLocations[];

  @Prop({
    required: true,
    type: String,
    enum: CompaniesStatus,
    default: CompaniesStatus.PENDING,
  })
  status: CompaniesStatus;
}

export const CompaniesSchema = SchemaFactory.createForClass(Companies);
