//? Imports de codigo
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any): Types.ObjectId {
    switch (true) {
      case value === null || value === undefined:
        throw new BadRequestException('ObjectId is undefined');
      case value === '':
        throw new BadRequestException('ObjectId is empty');
      case !Types.ObjectId.isValid(value):
        throw new BadRequestException('Invalid ObjectId');
      default:
        return new Types.ObjectId(value)
    }
  }
}
