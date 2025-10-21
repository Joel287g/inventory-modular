//? Imports de codigo
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

//? Imports de usuario
import { IsPublicJwt } from '@main/common/decorators';
import { MimeTypesApplication } from '@main/common/enums';

import { CompaniesAuthCreateDto } from '@companies/dtos';

import { CompaniesAuthService } from '@companies/services';

@ApiTags('Companies Auth')
@Controller('companies-auth')
export class CompaniesAuthController {
  constructor(private readonly companiesAuthService: CompaniesAuthService) {}

  @IsPublicJwt()
  @Post('/create-company')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new company',
  })
  @ApiConsumes(MimeTypesApplication.JSON, MimeTypesApplication.FORM_URLENCODED)
  @ApiBody({ type: CompaniesAuthCreateDto })
  public async createOwner(@Body() payload: CompaniesAuthCreateDto) {
    try {
      return await this.companiesAuthService.create(payload);
    } catch (error) {
      throw error;
    }
  }
}
