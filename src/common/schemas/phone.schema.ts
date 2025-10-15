//? Imports de codigo
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: false,
  versionKey: false,
  toJSON: { virtuals: false, getters: true },
  _id: false,
})
export class Phone extends Document {
  @Prop({ required: false, type: String })
  cca2: string;

  @Prop({ required: false, type: String })
  code: string;

  @Prop({ required: false, type: String })
  number: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
