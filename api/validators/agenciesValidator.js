import Joi from 'joi';

// Custom validation function for validating image strings
const validateImageString = (value, helpers) => {

    // Regular expression to match image URL format
    const imageUrlRegex = /^https?:\/\/\S+\.(png|jpeg|jpg|svg\+xml)$/i;
  
    if (imageUrlRegex.test(value)) {
      return value;
    }
  
    return helpers.error('any.invalid');
};
  

export const createAgenciesSchema = Joi.object({
    name: Joi.string().required(), 
    phoneNr: Joi.number().positive().required(), 
    email: Joi.string().email().required(), 
    image: Joi.string().custom(validateImageString, 'image string validation').required()
});


export const createAgencyEmployeesSchema = Joi.object({
    userId: Joi.alternatives().try(
        Joi.string().length(12).hex(),
        Joi.string().length(24).hex(),
        Joi.number().integer().positive()).required(),

	realEstateAgencyId: Joi.alternatives().try(
        Joi.string().length(12).hex(),
        Joi.string().length(24).hex(),
        Joi.number().integer().positive()).required()
});


export const updateAgenciesSchema = Joi.object({
    id: Joi.alternatives().try(
        Joi.string().length(12).hex(),
        Joi.string().length(24).hex(),
        Joi.number().integer().positive()).required(),
    name: Joi.string(), 
    phoneNr: Joi.number().positive(), 
    email: Joi.string().email(), 
    image: Joi.string().custom(validateImageString, 'image string validation')
});


export const deleteAgencieEmployeeSchema = Joi.object({

    employeeId: Joi.alternatives().try(
        Joi.string().length(12).hex(),
        Joi.string().length(24).hex(),
        Joi.number().integer().positive()).required(),

    agencyId: Joi.alternatives().try(
        Joi.string().length(12).hex(),
        Joi.string().length(24).hex(),
        Joi.number().integer().positive()).required()
});