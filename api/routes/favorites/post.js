import express from "express";
import { ObjectId } from "mongodb";

import { db } from "../../db/mongo.js";
import { idSchema } from "../../validators/idValidator.js";

const postFavoritesRouter = express.Router();

// add a new favorites
postFavoritesRouter.post("/:houseId", async (req, res) => {
    const houseId = new ObjectId(req.params.houseId);
    const loggedInUser = req.user;

    // Validation of the id
    const { error } = idSchema.validate(houseId);

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }

    if(loggedInUser){
        // check if the favorite with the given userId and housId is already in the database.
        const userId = loggedInUser._id;
        let favorites = await db.collection("favorites").findOne({$and: [
            {userId},
            {houseId} 
        ]});
 
        // Add favorites
        if (!favorites) {
        await db.collection("favorites").insertOne({ 
            userId,
            houseId,
            timestamp: Date.now()
        });
    
        return res.json({message: `This real estate with the id: ${houseId} is added to your favorites.`});

        }else{
        return res.status(400).json({
            error: 'This real estate has already been added to your favorites.',
        });
        
        }
    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
   
});
  

export { postFavoritesRouter };