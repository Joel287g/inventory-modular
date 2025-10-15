//? Imports de codigo
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { HttpStatus } from '@nestjs/common';

//? Imports de usuario
import { ParseObjectIdPipe } from '@common/pipes';
import { MethodsHttp } from '@common/enums';

export class SnifferCreateDto {
  @ApiProperty({
    description: 'Authorization (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  auth?: string;

  @ApiProperty({
    description: 'User ID (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform((value) => new ParseObjectIdPipe().transform(value))
  userId?: Types.ObjectId;

  @ApiProperty({
    description: 'Url from the request (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({
    description: 'IP of the user making the request (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  ip: string;

  @ApiProperty({
    description: 'Application content (required)',
    required: true,
  })
  @IsNotEmpty()
  request: any;

  @ApiProperty({
    description: 'Response from the request (required)',
    required: false,
  })
  @IsOptional()
  response?: any;

  @ApiProperty({
    description: 'Request headers (requied)',
    required: true,
  })
  @IsOptional()
  headers?: any;

  @ApiProperty({
    description: 'HTTP response method (required)',
    required: true,
    enum: MethodsHttp,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(MethodsHttp)
  method: MethodsHttp;

  @ApiProperty({
    description: 'HTTP response code (required)',
    required: true,
    enum: HttpStatus,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsEnum(HttpStatus)
  statusCode?: HttpStatus;

  @ApiProperty({
    description: 'Request time in ms (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  processingTime?: number;

  @ApiProperty({
    description: 'User agent (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiProperty({
    description: 'Referer (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  referer?: string;

  @ApiProperty({
    description: "Application's version (required)",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  appVersion: string;
}
