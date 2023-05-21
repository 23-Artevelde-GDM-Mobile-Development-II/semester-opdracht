import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";

const deleteRealEstateAgenciesRouter = express.Router();

// Remove user by id - (ADMIN ROUTE)
deleteRealEstateAgenciesRouter.delete("/:id", adminMiddleware, async (req, res) => {
  const id = req.params.id;
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

        console.log(deletedUser);
        if(deletedUser.deletedCount === 0){
            return res.json({message: 'This user could not be removed.'});
        }else{
            return res.json({message: 'This employee is succesfully removed from this real estate agency'});
        }
        
    }catch(err){
        return res.status(400).json({message: `Somthing went wrong, check the url again`, err : err})
    }
}

// Remove an employee from the real estate agent's agency
deleteRealEstateAgenciesRouter.delete("/:agencyId/employees/:employeeId", adminMiddleware,async (req, res) => {
    const employeeId = req.params.employeeId;
    const agencyId = req.params.agencyId;

    deleteEmployee(new ObjectId(employeeId), new ObjectId(agencyId), req, res);
        // try{
        //     const deletedUser = await db.collection("employees").deleteOne({
        //         $and: [
        //             { userId: new ObjectId(employeeId) },
        //             { realEstateAgencyId: agency.realEstateAgencyId }
        //         ]
        //     });

        //     console.log(deletedUser);
        //     if(deletedUser.deletedCount === 0){
        //         return res.json({message: 'This user could not be removed.'});
        //     }else{
        //         return res.json({message: 'This employee is succesfully removed from this real estate agency'});
        //     }
            
        // }catch(err){
        //     return res.status(400).json({message: `Somthing went wrong, check the url again`, err : err})
        // }
        

  
});

deleteRealEstateAgenciesRouter.delete("/own/employees/:id", realEstateAgentMiddleware,async (req, res) => {
    const employeeId = req.params.id;
    const loggedInUser = req.user;

    const agency = await db.collection("employees").findOne({
        userId: loggedInUser._id,
    });
    console.log('agencyEmployee info logged in user', agency);

    if(agency){
        deleteEmployee(new ObjectId(employeeId), agency.realEstateAgencyId, req, res);
        // try{
        //     const deletedUser = await db.collection("employees").deleteOne({
        //         $and: [
        //             { userId: new ObjectId(employeeId) },
        //             { realEstateAgencyId: agency.realEstateAgencyId }
        //         ]
        //     });

        //     console.log(deletedUser);
        //     if(deletedUser.deletedCount === 0){
        //         return res.json({message: 'This user could not be removed.'});
        //     }else{
        //         return res.json({message: 'This employee is succesfully removed from this real estate agency'});
        //     }
            
        // }catch(err){
        //     return res.status(400).json({message: `Somthing went wrong, check the url again`, err : err})
        // }
        
    }else{
        return res.status(403).json({message: 'You are not an employee of an real estate agency.'})
    }

  
});




export {deleteRealEstateAgenciesRouter};