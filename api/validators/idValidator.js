import Joi from 'joi';

export const idSchema = Joi.alternatives().try(
    Joi.string().length(12).hex(),
    Joi.string().length(24).hex(),
    Joi.number().integer().positive()
);