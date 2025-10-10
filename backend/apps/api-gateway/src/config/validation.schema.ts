import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .required(),
  USER_SERVICE_URL: Joi.string().uri().required(),
  INVENTORY_SERVICE_URL: Joi.string().uri().required(),
});

