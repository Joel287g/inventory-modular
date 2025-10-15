//? Imports de codigo
import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiSecurity } from '@nestjs/swagger';

//? Imports de usuario
import { version } from '../../../package.json';

export function SwaggerHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'app-version',
      description: 'Version for API',
      required: true,
      allowEmptyValue: false,
      schema: {
        type: 'string',
        default: version,
      },
    }),
    ApiSecurity('x-api-key'),
    ApiSecurity('authorization'),
  );
}
