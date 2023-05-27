import express from "express";
import { ObjectId } from "mongodb";

import { db } from "../../db/mongo.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";
import { updateRealEstate } from "../../validators/realEstateValidator.js";


const patchRealEstatesRouter = express.Router();

// update given real estate by id (REAL ESTATE AGENT & ADMIN ROUTE)
patchRealEstatesRouter.patch("/:id", realEstateAgentMiddleware ,async (req, res) => {

    const id = req.params.id;

    const { error } = updateRealEstate.validate({...req.body, id}, {abortEarly: false });

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }

    const { ...data } = req.body;

    const realEstate = await db
    .collection("realEstates")
    .findOne({ _id: new ObjectId(id) });

    if(realEstate){
        const newData = { ...realEstate, ...data };
        await db.collection("realEstates").replaceOne({ _id: realEstate._id }, newData);
        return res.json(newData);
    }else{
        return res.status(404).json({message: 'The real estate with this id is not found.'})
    }
});


export {  patchRealEstatesRouter };