//? Imports de codigo
import { SetMetadata } from '@nestjs/common';

//? Imports de usuario
import { GuardsDecorators } from '@common/enums';

export const IsPublicJwt = () =>
  SetMetadata(GuardsDecorators.IS_PUBLIC_JWT, true);
