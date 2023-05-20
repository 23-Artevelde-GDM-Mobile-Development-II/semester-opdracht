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
    const type = req.body.type;

    await db.collection("realEstateTypes").insertOne({ 
        type: type,
     });

    return res.json({message: 'Real estate type has been added to the database.'});
});

// Add a new subtype of an type for real estates 
postRealEstatesRouter.post("/types/:typeId/subtypes", adminMiddleware, async (req, res) => {
    const typeId = req.params.typeId;
    const subtype = req.body.subtype;

    await db.collection("realEstateSubTypes").insertOne({ 
        typeId: new ObjectId(typeId),
        subtype: subtype
     });

    return res.json({message: 'Real estate subtype has been added to the database.'});
});

export { postRealEstatesRouter };