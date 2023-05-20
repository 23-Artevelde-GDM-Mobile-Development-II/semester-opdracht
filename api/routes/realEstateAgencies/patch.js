import express from "express";
import { ObjectId } from "mongodb";

import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";

const patchAgenciesRouter = express.Router();


async function updateAgency(id, req, res) {
    const agency = await db.collection("realEstateAgencies").findOne({
        _id: new ObjectId(id),
    });

    if (agency) {
        const { _id, ...data } = req.body;
         
        const newData = { ...userRole, ...data };
        await db.collection("realEstateAgencies").replaceOne({ _id: new ObjectId(id)}, newData);

        return res.json(newData);

    } else {
        return res.status(404).json({ error: "This real estate agency does not exist." });
    }
}

// update real estate agency by id
patchAgenciesRouter.patch("/:id", adminMiddleware, async (req, res) => {
    
    const id = req.params.id;
    updateAgency(id, req, res);
});
  
// update own agency of the real estate agent
patchAgenciesRouter.patch("/own", realEstateAgentMiddleware , async (req, res) => {
    

    const loggedInUser = req.user;

    const employee = await db.collection("employees").findOne({
        userId: new ObjectId(loggedInUser._id),
    });

    if (employee) {
        updateAgency(employee.realEstateAgencyId, req, res);
    } else {
        return res.status(403).json({ error: "You are not able to edit the real estate agency data because you are not added to an real estate agency." });
    }
   
});

  

export { patchAgenciesRouter };