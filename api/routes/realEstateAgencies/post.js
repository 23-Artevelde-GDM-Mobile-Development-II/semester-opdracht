import express from "express";
import { ObjectId } from "mongodb";

import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";
import { createAgencyEmployeesSchema, createAgenciesSchema } from "../../validators/agenciesValidator.js";

const postAgenciesRouter = express.Router();

// add a new real estate agency
postAgenciesRouter.post("/", adminMiddleware, async (req, res) => {

    // Validation
    const { error, value } = createAgenciesSchema.validate({...req.body}, {abortEarly: false });

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }
    const { name, phoneNr, email, image} = value;
    
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
  

async function addEmployeeToAgency(value, res){
  
    let employeeInDb = await db.collection("employees").findOne({
      userId: new ObjectId(value.userId),
    });

    if(!employeeInDb){
      await db.collection("employees").insertOne({ 
        userId: new ObjectId(value.userId),
        realEstateAgencyId: new ObjectId(value.realEstateAgencyId)
       });

      return res.json({message: 'Employee is successfully added.'});
    }else{
      return res.status(400).json({
        error: 'This user is already added as an employee to an real estate agency.'
      });
    }
}

// Post a new employee in the agency of the logged in user
postAgenciesRouter.post("/myAgency/employees", realEstateAgentMiddleware, async (req, res) => {
  const loggedInUser = req.user;
  
  const agency = await db.collection("employees").findOne({
    userId: loggedInUser._id
  });


  if (agency) {
    const realEstateAgencyId = agency.realEstateAgencyId.toString();
    // Validation
    const { error, value } = createAgencyEmployeesSchema.validate({...req.body, realEstateAgencyId}, {abortEarly: false });

    if (error) {
      const errorArray = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errorArray });

    }
    addEmployeeToAgency(value, res);
  }else{
    return res.status(400).json({
        error: "You don't belong to an real estate agency."
    });
  }

});

// Add employees to the real estate agency of the given id (ADMIN ROUTE)
postAgenciesRouter.post("/:realEstateAgencyId/employees", adminMiddleware, async (req, res) => {
    const realEstateAgencyId = req.params.realEstateAgencyId;

    // Validation
    const { error, value } = createAgencyEmployeesSchema.validate({...req.body, realEstateAgencyId}, {abortEarly: false });

    if (error) {
      const errorArray = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errorArray });

    }

    let agency = await db.collection("realEstateAgencies").findOne({
      _id: new ObjectId(realEstateAgencyId),
    });
  
    if (agency) {
      addEmployeeToAgency(value, res);
    }else{
      return res.status(400).json({
          error: 'This agency does not exist.'
      });
    }
    
  
});
  

export { postAgenciesRouter };