//? Imports de codigo
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneDto {
  @ApiProperty({
    description: 'Country code alpha-2 (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  cca2: string;

  @ApiProperty({
    description: 'Code zone for the phone number (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Phone number (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  number: string;
}
