import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";
import { getRealEstate } from "../../validators/realEstateValidator.js";
import { idSchema } from "../../validators/idValidator.js";

const getRealEstatesRouter = express.Router();

// Get all real estates with or without filter (mostRecent, oldest, cheapest, mostExpensive)
getRealEstatesRouter.get("/sellingMethod/:sellingMethod", async (req, res) => {
  const sellingMethod = req.params.sellingMethod;
  const sortBy = req.query.sortBy

  const { error } = getRealEstate.validate({...req.body, sellingMethod}, {abortEarly: false });

  if (error) {
    const errorArray = error.details.map((err) => err.message);
    return res.status(400).json({ errors: errorArray });
  }  

  const { typeId, subTypeId, city, zipCode, priceMin, priceMax, livingAreaMin,
  livingAreaMax, landAcreageMin, landAcreageMax, numberOfRoomsMin, numberOfBathroomsMin, 
  gardenAvailable, terraceAvailable, balconyAvailable, parkingAvailable, hasSolarPanels, epcMin} = req.body;

    let filterOptions = [ 
        { 'realEstate.sellingMethod': sellingMethod }, 
        {published: true },
        {isAvailable: true} 
    ] ;

    const optionalFilterOptions = [
        { 'location.city': city },
        { 'location.zipcode': zipCode },
        { 'realEstate.typeId': typeId },
        { 'realEstate.subTypeId': subTypeId },
        { 'realEstate.price': { $gt: priceMin, $lt: priceMax } },
        { 'realEstate.livingArea': { $gt: livingAreaMin, $lt: livingAreaMax } },
        { 'outside.landAcreage': { $gt: landAcreageMin, $lt: landAcreageMax } },
        { 'outside.gardenAvailable':gardenAvailable },
        { 'outside.terraceAvailable':terraceAvailable },
        { 'outside.balconyAvailable':balconyAvailable },
        { 'outside.parkingAvailable':parkingAvailable },
        { 'layout.numberOfBedrooms': { $gte: numberOfRoomsMin } },
        { 'layout.numberOfBathrooms': { $gte: numberOfBathroomsMin } },
        
        { 'energy.hasSolarPanels':hasSolarPanels },
    ];
    
      // Filter based on epc
      if (epcMin) {
        const epcRange = ["a", "b", "c", "d", "e", "f"];
        const index = epcRange.indexOf(epcMin);
        if (index !== -1) {
          const epcFilter = epcRange.slice(0, index + 1);
          optionalFilterOptions.push({ 'energy.epc': { $regex: `^[${epcFilter.join("")}]` } });
        }
      }
    
    // Filter out empty or undefined values from optionalFilterOptions
    const filteredOptions = optionalFilterOptions.filter((option) => {
        const value = Object.values(option)[0];
        return value !== undefined && value !== "" && (typeof value !== "object" || Object.values(value).some((v) => v !== undefined));
    });

    filterOptions = filterOptions.concat(filteredOptions);

    try {
        const query = await db.collection("realEstates").find({ $and: filterOptions });

        // Sorting based on user input
        if (sortBy) {
            let sortOptions = {};

            if (sortBy === "mostRecent") {
                sortOptions = { publishDate: -1 }; 
            } else if (sortBy === "oldest") {
                sortOptions = { publishDate: 1 }; // Sort by ascending order of createdAt field
            } else if (sortBy === "cheapest") {
                sortOptions = { 'realEstate.price': 1 }; // Sort by ascending order of price field
            } else if (sortBy === "mostExpensive") {
                sortOptions = { 'realEstate.price': -1 }; // Sort by descending order of price field
            }

            const realEstates = await query.sort(sortOptions).toArray();
            res.json({realEstates})
        }else{
            const realEstates = await query.toArray();
            res.json({realEstates})
        }
        

    } catch (error) {
        res.status(400).json({message: error});
        
    }
    
        
});

// Get all real estates even if they are offline or not available anymore (real estate agent & admin route)
getRealEstatesRouter.get("/", realEstateAgentMiddleware, async (req, res) => {
  const realEstates = await db.collection("realEstates").find().toArray();
  res.json(realEstates);
});

// Get real estate by id
getRealEstatesRouter.get("/realEstateId/:id", async (req, res) => {
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

  if (realEstate) {
    return res.json(realEstate);
  } else {
    return res.status(404).json({ error: "Real estate not found" });
  }
});


getRealEstatesRouter.get("/types", async (req, res) => {
  const types = await db.collection("realEstateTypes").find().toArray();

  if (types) {
    return res.json(types);
  } else {
    return res.status(404).json({ error: "There are no types in the database." });
  }
});

getRealEstatesRouter.get("/subTypes", async (req, res) => {
  const subTypes = await db.collection("realEstateSubTypes").find().toArray();

  if (subTypes) {
    return res.json(subTypes);
  } else {
    return res.status(404).json({ error: "There are no subTypes in the database." });
  }
});

export {getRealEstatesRouter};
