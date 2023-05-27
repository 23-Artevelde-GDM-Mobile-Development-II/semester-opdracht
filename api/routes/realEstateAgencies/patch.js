import express from "express";
import { ObjectId } from "mongodb";

import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";
import { updateAgenciesSchema } from "../../validators/agenciesValidator.js";

const patchAgenciesRouter = express.Router();

async function updateAgency(id, req, res) {
    const agency = await db.collection("realEstateAgencies").findOne({
      _id: id,
    });
  
    if (agency) {
      const { _id, ...data } = req.body;
  
      const newData = { ...agency, ...data };
      await db.collection("realEstateAgencies").replaceOne(
        { _id: id },
        newData
      );
  
      return res.json(newData);
    } else {
      return res
        .status(404)
        .json({ error: "This real estate agency does not exist." });
    }
  }


// update own agency of the real estate agent
patchAgenciesRouter.patch("/own", realEstateAgentMiddleware , async (req, res) => {
  const loggedInUser = req.user;

  const employee = await db.collection("employees").findOne({
      userId: loggedInUser._id,
  });

  if (employee) {
      const id = employee.realEstateAgencyId.toString();
      const { error } = updateAgenciesSchema.validate({...req.body, id}, {abortEarly: false });

      if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });

      }
      
      updateAgency(new ObjectId(id), req, res); 


  } else {
      return res.status(403).json({ error: "You are not able to edit the real estate agency data because you are not added to a real estate agency." });
  }
});

  

// update real estate agency by id
patchAgenciesRouter.patch("/:id", adminMiddleware, async (req, res) => {
    
    const id = req.params.id;
    const { error } = updateAgenciesSchema.validate({...req.body, id}, {abortEarly: false });

      if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });

    }

    updateAgency(new ObjectId(id), req, res);


});

  

export { patchAgenciesRouter };