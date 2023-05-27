import express from "express";

import { db } from "../../db/mongo.js";

const getFavoritesRouter = express.Router();

// Get all favorites of the logged in user
getFavoritesRouter.get("/", async (req, res) => {
    const loggedInUser = req.user;

    if(loggedInUser){
        // check if the favorite with the given userId and housId is already in the database.
        const userId = loggedInUser._id;
        let favorites = await db.collection("favorites").find({userId}).toArray();
 
        if (favorites.length > 0) {
            

            const favoriteRealEstatesData = [];

            // Get all data from favorite real estates
            favorites.map(async (favorite)=>{
                let realEstateData = await db.collection("favorites").findOne({_id: favorite.houseId})

                favoriteRealEstatesData.push(realEstateData);
            });

            return res.json(favoriteRealEstatesData);

        }else{
            return res.status(404).json({message: 'No favorites found.'});

        };

    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
   
});
  

export { getFavoritesRouter };