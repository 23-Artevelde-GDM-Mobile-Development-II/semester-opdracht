import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";
import { idSchema } from "../../validators/idValidator.js";


const getAgenciesRouter = express.Router();

// Get all agencies 
getAgenciesRouter.get("/", async (req, res) => {
  const realEstateAgencies = await db.collection("realEstateAgencies").find().toArray();
  res.json(realEstateAgencies);
});

// Get agency by id
getAgenciesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  // Validation of the id
  const { error } = idSchema.validate(id);

  if (error) {
    const errorArray = error.details.map((err) => err.message);
    return res.status(400).json({ errors: errorArray });
  }

  const agency= await db.collection("realEstateAgencies").findOne({
    _id: new ObjectId(id),
  });

  if (agency) {
    return res.json(agency);
  } else {
    return res.status(404).json({ error: "Agency not found." });
  }
});


async function getAllEmployees(employeesList, req, res) {
    if (employeesList.length>= 1) {

        let usersArray = [];
    
        await Promise.all(employeesList.map(async (employee) => {
        const user = await db.collection("users").findOne({ _id: employee.userId });
        usersArray.push(user);
        }));
    
        return res.json(usersArray);
      } else {
        return res.status(404).json({ error: "This real estate agency does not exist or has no employees assigned." });
      }
}


getAgenciesRouter.get("/own/employees", realEstateAgentMiddleware, async (req, res) => {

  const id = req.user._id;

  const agency = await db.collection("employees").findOne({
    userId: id,
  });

  if (agency) {
    const employees = await db.collection("employees").find({
      realEstateAgencyId: agency.realEstateAgencyId,
    }).toArray();

    getAllEmployees(employees, req, res);
  } else {
    return res.status(404).json({ error: "You are not assigned to a real estate agency." });
  }
});



// Get employees of a agency by id - (ADMIN ROUTE)
getAgenciesRouter.get("/:id/employees", adminMiddleware, async (req, res) => {
  const id = req.params.id;
  // Validation of the id
  const { error } = idSchema.validate(id);

  if (error) {
    const errorArray = error.details.map((err) => err.message);
    return res.status(400).json({ errors: errorArray });
  }

  const employees = await db.collection("employees").find({
    realEstateAgencyId: new ObjectId(id),
  }).toArray();

  getAllEmployees(employees, req, res);
  
});




export {getAgenciesRouter};
