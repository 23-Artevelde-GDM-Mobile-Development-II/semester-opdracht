import Joi from 'joi';

const idSchema = Joi.alternatives().try(
    Joi.string().length(12).hex(),
    Joi.string().length(24).hex(),
    Joi.number().integer().positive()
).required();

export const createMessageSchema = Joi.object({
    messageText: Joi.string().required(),
	receiverId: idSchema,
	realEstateId: idSchema
});


export const createReplySchema = Joi.object({
    repliedMessageId: idSchema,
    messageText: Joi.string().required(),
	receiverId: idSchema,
	realEstateId: idSchema
});

export const updateMessageSchema = Joi.object({
    messageId: idSchema,
    isRead: Joi.boolean().required()
});

