//? Imports de codigo
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

//? Imports de usuario
import { Auth, GetUser, IsPublicJwt } from '@main/common/decorators';
import { MimeTypesApplication } from '@main/common/enums';

import { UsersRoles } from '@users/enums';
import { UsersAuthService } from '@users/services';
import { UsersAuthCreateOwnerDto, UsersAuthLoginDto } from '@users/dtos';
import { Users } from '../schemas';

@ApiTags('Users Auth')
@ApiSecurity('authorization')
@Controller('users-auth')
export class UsersAuthController {
  constructor(private readonly usersAuthService: UsersAuthService) {}

  @Auth(UsersRoles.ADMIN)
  @Post('/create-owner')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user owner without company',
  })
  @ApiConsumes(MimeTypesApplication.JSON, MimeTypesApplication.FORM_URLENCODED)
  @ApiBody({ type: UsersAuthCreateOwnerDto })
  public async createOwner(
    @Body() payload: UsersAuthCreateOwnerDto,
    @GetUser() user: Users,
  ) {
    try {
      console.log('user :>> ', user);
      return await this.usersAuthService.createOwner(payload);
    } catch (error) {
      throw error;
    }
  }

  @IsPublicJwt()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiBody({ type: UsersAuthLoginDto })
  async login(@Body() payload: UsersAuthLoginDto) {
    try {
      return await this.usersAuthService.login(payload);
    } catch (error) {
      throw error;
    }
  }
}
