//? Imports de codigo
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

//? Imports de usuario
import { Collections } from "@common/enums";

import { LoggerLevel, LoggerTypes } from '@logger/enums';
import * as LoggerMessages from '@logger/enums/logger-messages.enum';

@Schema({
  _id: true,
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: false, getters: false },
  collection: Collections.LOGGER,
})
export class Logger extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(LoggerMessages).flatMap((value) =>
      Object.values(value).map((value) => value),
    ),
  })
  message: (typeof LoggerMessages)[keyof typeof LoggerMessages];

  @Prop({ required: true, type: String, enum: LoggerLevel })
  level: LoggerLevel;

  @Prop({ required: true, type: String, enum: LoggerTypes })
  type: LoggerTypes;

  @Prop({ required: true, type: {}, default: {} })
  data: unknown;
}

export const LoggerSchema = SchemaFactory.createForClass(Logger);
