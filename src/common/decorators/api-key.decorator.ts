//? Imports de codigo
import { SetMetadata } from '@nestjs/common';

//? Imports de usuario
import { GuardsDecorators } from '@common/enums';

export const IsPublicApiKey = () =>
  SetMetadata(GuardsDecorators.IS_PUBLIC_API_KEY, true);
