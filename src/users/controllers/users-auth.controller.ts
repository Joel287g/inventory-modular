//? Imports de codigo
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

//? Imports de usuario
import { IsPublicJwt, SwaggerHeaders } from '@main/common/decorators';

import { UsersAuthService } from '@users/services';
import { UsersAuthCreateOwnerDto } from '@users/dtos';

@SwaggerHeaders()
@ApiTags('Users Auth')
@Controller('users-auth')
export class UsersAuthController {
  constructor(private readonly usersAuthService: UsersAuthService) {}

  @IsPublicJwt()
  @Post('/create-owner')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user owner without company',
  })
  @ApiConsumes('application/json')
  @ApiBody({ type: UsersAuthCreateOwnerDto })
  public async createOwner(@Body() payload: UsersAuthCreateOwnerDto) {
    try {
      return await this.usersAuthService.createOwner(payload);
    } catch (error) {
      throw error;
    }
  }
}
