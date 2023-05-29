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
            console.log(favorites);

            const favoriteRealEstatesData = await Promise.all(
                favorites.map(async (favorite) => {
                    console.log('favorite', favorite);
                  let realEstateData = await db.collection("realEstates").findOne({ _id: favorite.houseId });
                  console.log(realEstateData);
              
                  return realEstateData;
                })
              );
              
            return res.json(favoriteRealEstatesData);

        }else{
            return res.status(404).json({message: 'No favorites found.'});

        };

    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
   
});
  

export { getFavoritesRouter };