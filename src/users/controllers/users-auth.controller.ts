//? Imports de codigo
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
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
import {
  UsersAuthAddCompanyDto,
  UsersAuthCreateOwnerDto,
  UsersAuthLoginDto,
} from '@users/dtos';
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
      return await this.usersAuthService.createOwner(payload);
    } catch (error) {
      throw error;
    }
  }

  @IsPublicJwt()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiConsumes(MimeTypesApplication.JSON, MimeTypesApplication.FORM_URLENCODED)
  @ApiBody({ type: UsersAuthLoginDto })
  async login(@Body() payload: UsersAuthLoginDto) {
    try {
      return await this.usersAuthService.login(payload);
    } catch (error) {
      throw error;
    }
  }

  @Auth([UsersRoles.ADMIN, UsersRoles.OWNER])
  @Patch('/add-company')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add company to user' })
  @ApiConsumes(MimeTypesApplication.JSON, MimeTypesApplication.FORM_URLENCODED)
  @ApiBody({ type: UsersAuthAddCompanyDto })
  public async addCompany(
    @GetUser() user: Users,
    @Body() payload: UsersAuthAddCompanyDto,
  ) {
    try {
      return await this.usersAuthService.addCompany(user, payload);
    } catch (error) {
      throw error;
    }
  }
}
