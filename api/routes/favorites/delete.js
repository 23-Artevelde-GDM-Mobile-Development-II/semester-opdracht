import express from "express";

import { db } from "../../db/mongo.js";
import { idSchema } from "../../validators/idValidator.js";

const deleteFavoritesRouter = express.Router();

// Get all favorites of the logged in user
deleteFavoritesRouter.get("/:houseId", async (req, res) => {
    const loggedInUser = req.user;
    const houseId = req.params.houseId;

    // Validation of the id
    const { error } = idSchema.validate(houseId);

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }

    if(loggedInUser){
        // check if the favorite with the given userId and housId is already in the database.
        const userId = loggedInUser._id;
        let favorite = await db.collection("favorites").findOne({$and: [
            {userId},
            {houseId} 
        ]});
 
        if (favorite) {
            

            // delete favorite
            await db.collection("favorites").deleteOne({
                _id: favorite._id
            });

            return res.json({message: "This real estate is succesfully deleted from your favorites."});

        }else{
            return res.status(404).json({message: "This real estate is not added to your favorites, so you can't delete this."});

        };

    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
   
});
  

export { deleteFavoritesRouter };