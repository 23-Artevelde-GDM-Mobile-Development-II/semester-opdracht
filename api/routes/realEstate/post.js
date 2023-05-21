import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";

const postRealEstatesRouter = express.Router();

// add real estate
postRealEstatesRouter.post("/", realEstateAgentMiddleware, async (req, res) => {
    const {...data} = req.body;
    await db.collection("realEstates").insertOne({ 
        ...data,
        publishDate: Date.now(),
        isAvailable: true
     });
    return res.json({message: 'Real estate has been added to the database.'});
   
});
  
// Add a new type for real estates
postRealEstatesRouter.post("/types", adminMiddleware, async (req, res) => {
    const typeName = req.body.type;

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
    const subtypeName = req.body.subtype;


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