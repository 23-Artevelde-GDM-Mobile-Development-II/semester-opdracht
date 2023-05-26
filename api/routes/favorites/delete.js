import express from "express";
import { ObjectId } from "mongodb";

import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";

const deleteFavoritesRouter = express.Router();

// Get all favorites of the logged in user
deleteFavoritesRouter.get("/:houseId", async (req, res) => {
    const loggedInUser = req.user;
    const houseId = req.params.houseId;

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