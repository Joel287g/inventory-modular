//? Imports de codigo
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

//? Imports de usuario

export class UsersAuthLoginDto {
  @ApiProperty({
    description: 'UID of firebase of the owner (required)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  uid: string;
}
