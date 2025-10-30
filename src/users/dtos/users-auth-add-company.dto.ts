//? Imports de codigo
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

//? Imports de usuario
import { ParseObjectIdPipe } from '@main/common/pipes';

export class UsersAuthAddCompanyDto {
  @ApiProperty({
    type: Types.ObjectId,
    description: 'Company ID (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsObject()
  @Transform(({ value }) => new ParseObjectIdPipe().transform(value))
  companyId: Types.ObjectId;

  @ApiProperty({
    type: Types.ObjectId,
    description: 'Owner ID (optional)',
    required: true,
  })
  @IsOptional()
  @IsObject()
  @Transform(({ value }) => new ParseObjectIdPipe().transform(value))
  ownerId: Types.ObjectId;
}
