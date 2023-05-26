import Joi from 'joi';

export const createUserSchema = Joi.object({
    firstname: Joi.string().required(),
	lastname: Joi.string().required(),
	email: Joi.string().email().required(),
	phoneNr: Joi.number().positive().required(),
	password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

export const createAndUpadateUserRolesSchema = Joi.object({
    userId: Joi.alternatives().try(
        Joi.string().length(12).hex(),
        Joi.string().length(24).hex(),
        Joi.number().integer().positive()
      ).required(),
	role: Joi.string().valid('regularUser', 'realEstateAgent', 'admin').required()
});



export const updateUserSchema = Joi.object({
    id: Joi.alternatives().try(
        Joi.string().length(12).hex(),
        Joi.string().length(24).hex(),
        Joi.number().integer().positive()
    ),
    firstname: Joi.string(),
	lastname: Joi.string(),
	email: Joi.string().email(),
	phoneNr: Joi.number().positive(),
	password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});


// Export other validation schemas related to users if needed
// ...