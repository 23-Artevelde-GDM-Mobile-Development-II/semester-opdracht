import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";
import { idSchema } from "../../validators/idValidator.js";

const deleteRealEstatesRouter = express.Router();

// Remove real estate by id - (REAL ESTATE AGENT & ADMIN ROUTE)
deleteRealEstatesRouter.delete("/:id", realEstateAgentMiddleware , async (req, res) => {
  const id = req.params.id;

   // Validation of the id
   const { error } = idSchema.validate(id);

   if (error) {
       const errorArray = error.details.map((err) => err.message);
       return res.status(400).json({ errors: errorArray });
   }


  const realEstate = await db.collection("realEstates").findOne({
    _id: new ObjectId(id),
  });

  if(realEstate){
    try{
        await db.collection("realEstates").deleteOne({
            _id: realEstate._id,
        });

        return res.json({message: 'Real estate is succesfully removed.'})
    }catch(err){
        return (res.status(400).json({error: err}))
    }
   
  }else{
    return res.status(404).json({message: 'Real estate not found.'})
  }

  
});


// Remove an employee from the real estate agent's agency
deleteRealEstatesRouter.delete("/types/:id", adminMiddleware,async (req, res) => {
    const typeId = req.params.id;

    // Validation of the id
    const { error } = idSchema.validate(id);

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }

    const realEstateType = await db.collection("realEstateTypes").findOne({
        _id: new ObjectId(typeId),
      });
    
      if(realEstateType){
        try{
            await db.collection("realEstateTypes").deleteOne({
                _id: realEstateType._id,
            });

            const subtype = await db.collection("realEstateSubTypes").findOne({
                typeId: new ObjectId(typeId),
            });

            if(subtype){
                // Delete all subtypes that belong to the main type
                await db.collection("realEstateSubTypes").deleteMany({
                    typeId: realEstateType._id
                });

                return res.json({message: 'The main type with the given id and subtypes that belong to the main type are succesfully removed.'})
            }
            
    
            return res.json({message: 'Type with the given id is succesfully removed.'})
        }catch(err){
            return (res.status(400).json(err))
        }
       
      }else{
        return res.status(404).json({message: 'Type with this id is not found.'});
      }
  
});


// Delete subtype
deleteRealEstatesRouter.delete("/subTypes/:id", adminMiddleware,async (req, res) => {
    const id = req.params.id;

     // Validation of the id
    const { error } = idSchema.validate(id);

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }

    const subtype = await db.collection("realEstateSubTypes").findOne({
        _id: new ObjectId(id),
    });

    if(subtype){
        // Delete all subtypes that belong to the main type
        await db.collection("realEstateSubTypes").deleteMany({
            typeId: realEstateType._id
        });

        return res.json({message: 'The subtype with the given id is succesfully removed.'})
    }else{
        return res.status(404).json({message: 'Subtype with this id is not found.'});
    }
})







export {deleteRealEstatesRouter};