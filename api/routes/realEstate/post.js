import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";
import { createRealEstate, createRealEstateSubType, createRealEstateType, updateRealEstate } from "../../validators/realEstateValidator.js";

const postRealEstatesRouter = express.Router();

// add real estate
postRealEstatesRouter.post("/", realEstateAgentMiddleware, async (req, res) => {

    const { error, value } = createRealEstate.validate({...req.body}, {abortEarly: false });

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });

    }

    const {...data} = value;

    await db.collection("realEstates").insertOne({ 
        ...data,
        publishDate: Date.now(),
        isAvailable: true
     });
    return res.json({message: 'Real estate has been added to the database.'});
   
});
  
// Add a new type for real estates
postRealEstatesRouter.post("/types", adminMiddleware, async (req, res) => {
    const typeName = req.body.typeName;

    const { error} = createRealEstateType.validate(typeName);

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });

    }

    const type = await db.collection("realEstateTypes").findOne({
        type: typeName,
    });

    if(!type){
        await db.collection("realEstateTypes").insertOne({ 
            type: typeName,
         });
    
        return res.json({message: 'Real estate type has been added to the database.'});
    }else{
        return res.status(400).json({message: 'Real estate type has already been added to the database.'});
    }
    
});

// Add a new subtype of an type for real estates 
postRealEstatesRouter.post("/types/:typeId/subtypes", adminMiddleware, async (req, res) => {
    const typeId = req.params.typeId;
    const subtypeName = req.body.subtypeName;

    const { error } = updateRealEstate.validate({typeId, subtypeName}, {abortEarly: false });

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }


    const subtype = await db.collection("realEstateSubTypes").findOne({
        subtype: subtypeName,
    });
    
    if (!subtype) {
        await db.collection("realEstateSubTypes").insertOne({ 
            typeId: new ObjectId(typeId),
            subtype: subtypeName
         });
    
        return res.json({message: 'Real estate subtype has been added to the database.'});
    }else{
        return res.status(400).json({message: 'Real estate subtype has already been added to the database.'});
    }
});

export { postRealEstatesRouter };