import Joi from 'joi';
// import { idSchema } from './idValidator';

const validateImageString = (value, helpers) => {
    const imageUrlRegex = /^https?:\/\/\S+\.(png|jpeg|jpg|svg\+xml)$/i;
  
    if (imageUrlRegex.test(value)) {
      return value;
    }
  
    return helpers.error('any.invalid');
};

const idSchemaRequired = Joi.alternatives().try(
    Joi.string().length(12).hex(),
    Joi.string().length(24).hex(),
    Joi.number().integer().positive()
  ).required();

const locationSchema = Joi.object({
    street: Joi.string().required(),
    number: Joi.number().integer().positive().required(),
    city: Joi.string().required(),
    zipCode: Joi.number().integer().positive().required()
  });
  
  const realEstateSchema = Joi.object({
    typeId: idSchemaRequired,
    subTypeId: idSchemaRequired,
    sellingMethod: Joi.string().valid('renting', 'selling').required(),
    price: Joi.number().when('sellingMethod', {
        is: 'renting',
        then: Joi.number().min(100), 
        otherwise: Joi.number().min(1000)
      }).required(),
    livingArea: Joi.number().required(),
    constructionYear: Joi.number().min(1980).max(new Date().getFullYear()).required()
  });
  
  const outsideSchema = Joi.object({
    gardenAvailable: Joi.boolean().required(),
    terraceAvailable: Joi.boolean().required(),
    balconyAvailable: Joi.boolean().required(),
    parkingAvailable: Joi.boolean().required(),
    landAcreage: Joi.number().required()
  });
  
  const layoutSchema = Joi.object({
    numberOfBedrooms: Joi.number().required(),
    numberOfBathrooms: Joi.number().required()
  });
  
  const energySchema = Joi.object({
    glassType: Joi.string().valid('single', 'double').required(),
    heatingSource: Joi.string().required(),
    hasSolarPanels: Joi.boolean().required(),
    epc: Joi.string().valid('a', 'b', 'c', 'd', 'e', 'f').required()
  });
  

export const createRealEstate = Joi.object({
    images: Joi.array().items(Joi.string().custom(validateImageString, 'image string validation')).required(),
    location: locationSchema.required(),
    realEstate: realEstateSchema.required(),
    outside: outsideSchema.required(),
    layout: layoutSchema.required(),
    energy: energySchema.required(),
    description: Joi.string().required(),
    published: Joi.boolean().required(),
    appointedRealEstateAgentId: idSchemaRequired,
    agencyId: idSchemaRequired
});


export const createRealEstateType = Joi.string().required();

export const createRealEstateSubType = Joi.object({
    typeId: idSchemaRequired,
    subtypeName: Joi.string().required()
});

export const updateRealEstate = createRealEstate
  .concat(Joi.object({ id: idSchemaRequired }))
  .fork(
    [
        'images',

        'location', 
        'location.street',
        'location.city',
        'location.zipCode', 
        'location.number', 

        'realEstate',
        'realEstate.typeId',
        'realEstate.subTypeId',
        'realEstate.sellingMethod',
        'realEstate.price',
        'realEstate.livingArea',
        'realEstate.constructionYear',

        'outside', 
        'outside.gardenAvailable',
        'outside.terraceAvailable',
        'outside.balconyAvailable',
        'outside.parkingAvailable',
        'outside.landAcreage',

        'layout',
        'layout.numberOfBedrooms',
        'layout.numberOfBathrooms',

        'energy', 
        'energy.glassType', 
        'energy.heatingSource', 
        'energy.hasSolarPanels', 
        'energy.epc', 

        'description', 
        'published', 
        'appointedRealEstateAgentId'
    ],
    (schema) => schema.optional()
);


export const getRealEstate = Joi.object({
    sellingMethod: Joi.string().valid('renting', 'selling'),
    typeId: Joi.alternatives().try(
        Joi.string().length(12).hex(),
        Joi.string().length(24).hex(),
        Joi.number().integer().positive()
      ), 
    subTypeId: Joi.alternatives().try(
        Joi.string().length(12).hex(),
        Joi.string().length(24).hex(),
        Joi.number().integer().positive()
      ), 
    city: Joi.string(),
    zipCode: Joi.number().integer().positive(),
    priceMin: Joi.when('sellingMethod', {
        is: 'selling',
        then: Joi.number().min(1000), 
        otherwise: Joi.number().min(100)
      }), 
    priceMax: Joi.when('priceMin', {
        is: Joi.number(),
        then: Joi.number().greater(Joi.ref('priceMin')),
        otherwise: Joi.when('sellingMethod', {
            is: 'selling',
            then: Joi.number().min(1000), 
            otherwise: Joi.number().min(100)})
        }),
    livingAreaMin: Joi.number(),
    livingAreaMax: Joi.when('livingAreaMin', {
        is: Joi.number(),
        then: Joi.number().greater(Joi.ref('livingAreaMin')),
        otherwise: Joi.number()
        }),
    landAcreageMin: Joi.number(), 
    landAcreageMax: Joi.when('landAcreageMin', {
        is: Joi.number(),
        then: Joi.number().greater(Joi.ref('landAcreageMin')),
        otherwise: Joi.number()
        }), 
    numberOfRoomsMin: Joi.number(), 
    numberOfBathroomsMin: Joi.number(), 
    gardenAvailable: Joi.boolean(), 
    terraceAvailable: Joi.boolean(),  
    balconyAvailable: Joi.boolean(), 
    parkingAvailable: Joi.boolean(), 
    hasSolarPanels: Joi.boolean(), 
    epcMin: Joi.string().valid('a', 'b', 'c', 'd', 'e', 'f')
});


