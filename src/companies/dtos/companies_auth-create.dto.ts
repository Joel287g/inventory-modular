//? Imports de codigo
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

//? Imports de usuario
import { ParseObjectIdPipe } from '@main/common/pipes';

export class CompaniesAuthCreateDto {
  @ApiProperty({
    type: Types.ObjectId,
    description: 'Owner ID (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsObject()
  @Transform(({ value }) => new ParseObjectIdPipe().transform(value))
  ownerId: Types.ObjectId;

  @ApiProperty({
    type: String,
    description: 'Company name (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Company address (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  address: string;
}
