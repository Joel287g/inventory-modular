//? Imports de codigo
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

//? Imports de usuario
import { IsPublicJwt, SwaggerHeaders } from '@main/common/decorators';

@SwaggerHeaders()
@ApiTags('Companies Auth')
@Controller('companies-auth')
export class CompaniesAuthController {
  constructor() {}

  @IsPublicJwt()
  @Post('/create-company')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new company',
  })
  @ApiConsumes('application/json')
  // @ApiBody({ type: UsersAuthCreateOwnerDto })
  public async createOwner(@Body() payload: any) {
    try {
      // return await this.usersAuthService.createOwner(payload);
    } catch (error) {
      throw error;
    }
  }
}
