import express from "express";
import { ObjectId } from "mongodb";

import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";

const postAgenciesRouter = express.Router();

// add a new real estate agency
postAgenciesRouter.post("/", adminMiddleware, async (req, res) => {
    const { name, phoneNr, email, image} = req.body;
    
    // check if agency exists in the database
    let agency = await db.collection("realEstateAgencies").findOne({ name });

    // Add agency
    if (!agency) {
      await db.collection("realEstateAgencies").insertOne({ 
        name: name,
        phoneNr: phoneNr,
        email: email,
        image: image
      });

      agency = await db.collection("realEstateAgencies").findOne({ name });
      return res.json(agency);
    }else{
      return res.status(400).json({
        error: 'This real estate agency has already been added to the database.',
      });
      
    }
   
});
  
// Add employees to the real estate agency of the given id (REAL ESTATE AGENT & ADMIN ROUTE)
postAgenciesRouter.post("/:id/employees", realEstateAgentMiddleware, async (req, res) => {
    const id = req.params.id;

    let agency = await db.collection("realEstateAgencies").findOne({
      _id: new ObjectId(id),
    });
  
    if (agency) {
      let employeeInDb = await db.collection("employees").findOne({
        userId: new ObjectId(req.body.userId),
      });

      if(!employeeInDb){
        await db.collection("employees").insertOne({ 
          userId: new ObjectId(req.body.userId),
          realEstateAgencyId: new ObjectId(id)
         });
  
        return res.json({message: 'Employee is successfully added.'});
      }else{
        return res.status(400).json({
          error: 'This user is already added as an employee to an real estate agency.'
        });
      }
    }else{
      return res.status(400).json({
          error: 'This agency does not exist.'
      });
    }
  
});
  

export { postAgenciesRouter };