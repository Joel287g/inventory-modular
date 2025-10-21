//? Imports de codigo
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

//? Imports de usuario
import { CompaniesLocationsStatus } from '@companies/enums';

@Schema({
  _id: true,
  timestamps: false,
  versionKey: false,
  toJSON: { virtuals: false, getters: true },
})
export class CompaniesLocations extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: false, type: String })
  name: string;

  @Prop({ required: true, type: String, trim: true })
  address: string;

  @Prop({
    required: true,
    type: String,
    enum: CompaniesLocationsStatus,
    default: CompaniesLocationsStatus.PENDING,
  })
  status: CompaniesLocationsStatus;
}

export const CompaniesLocationsSchema =
  SchemaFactory.createForClass(CompaniesLocations);
