//? Imports de codigo
import * as joi from 'joi';

export const environmentsValidations = joi.object({
  //? NODE_ENV
  NODE_ENV: joi.string().valid('development'),

  //? PORT
  PORT: joi.number().required(),

  //? SECURITY
  API_KEY: joi.string().required(),

  //? DATABASE
  DB_NAME: joi.string().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_CLUSTER: joi.string().required(),
  DB_URI: joi.string().required(),
});
