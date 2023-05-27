import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";
import { deleteAgencieEmployeeSchema } from "../../validators/agenciesValidator.js";
import { idSchema } from "../../validators/idValidator.js";

const deleteRealEstateAgenciesRouter = express.Router();

// Remove user by id - (ADMIN ROUTE)
deleteRealEstateAgenciesRouter.delete("/:id", adminMiddleware, async (req, res) => {
  const id = req.params.id;

  // Validation of the id
  const { error } = idSchema.validate(id);

  if (error) {
    const errorArray = error.details.map((err) => err.message);
    return res.status(400).json({ errors: errorArray });
  }

  
  const agency = await db.collection("realEstateAgencies").findOne({
    _id: new ObjectId(id),
  });

  if(agency){
    try{
        await db.collection("realEstateAgencies").deleteOne({
            _id: new ObjectId(id),
          });
    }catch(err){
        return (res.status(400).json({error: err}))
    }
    
    try{
        await db.collection("employees").deleteMany({
            realEstateAgencyId: new ObjectId(id),
        });

    }catch(err){
        return (res.status(400).json({error: err}))
    }

    return res.json({message: 'Real estate agency with assigned employees are succesfully removed.'})
  }else{
    return res.status(404).json({message: 'Real estate agency not found.'})
  }

  
});

async function deleteEmployee(employeeId, realEstateAgencyId, req, res){
    try{
        const deletedUser = await db.collection("employees").deleteOne({
            $and: [
                { userId: employeeId },
                { realEstateAgencyId: realEstateAgencyId }
            ]
        });

        if(deletedUser.deletedCount === 0){
            return res.json({message: 'This user could not be removed.'});
        }else{
            return res.json({message: 'This employee is succesfully removed from this real estate agency'});
        }
        
    }catch(err){
        return res.status(400).json({message: `Somthing went wrong, check the url again`, err : err})
    }
}


deleteRealEstateAgenciesRouter.delete("/myAgency/employees/:id", realEstateAgentMiddleware,async (req, res) => {
    const employeeId = req.params.id;
    const loggedInUser = req.user;

    // Validation of the id
    const { error } = idSchema.validate(employeeId);

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }

    const agency = await db.collection("employees").findOne({
        userId: loggedInUser._id,
    });

    if(agency){
        deleteEmployee(new ObjectId(employeeId), agency.realEstateAgencyId, req, res);
        
    }else{
        return res.status(403).json({message: 'You are not an employee of an real estate agency.'})
    }
});

// Remove an employee from the real estate agent's agency
deleteRealEstateAgenciesRouter.delete("/:agencyId/employees/:employeeId", adminMiddleware,async (req, res) => {
    const employeeId = req.params.employeeId;
    const agencyId = req.params.agencyId;

    // Validation of the id
    const { error } = deleteAgencieEmployeeSchema.validate({employeeId, agencyId}, {abortEarly: false });

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }

    deleteEmployee(new ObjectId(employeeId), new ObjectId(agencyId), req, res);
    
});




export {deleteRealEstateAgenciesRouter};