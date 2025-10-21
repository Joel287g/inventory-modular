//? Imports de codigo
import { PhoneDto } from '@main/common/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

//? Imports de usuario

export class UsersAuthCreateOwnerDto {
  @ApiProperty({
    type: String,
    description: 'User name (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'User last name (required)',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'User email (required)',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Phone of the user (optional)',
    required: false,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested({
    always: true,
  })
  @Type(() => PhoneDto)
  phone: PhoneDto;
}
