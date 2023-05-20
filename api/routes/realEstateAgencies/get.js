import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";

console.log('Entered getAgenciesRouter'); // Debug logging
const getAgenciesRouter = express.Router();

// Get all agencies 
getAgenciesRouter.get("/", async (req, res) => {
  const realEstateAgencies = await db.collection("realEstateAgencies").find().toArray();
  res.json(realEstateAgencies);
});

// Get agency by id
getAgenciesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
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
    if (employeesList.length> 1) {

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

// Get employees of a agency by id - (ADMIN ROUTE)
getAgenciesRouter.get("/:id/employees", adminMiddleware, async (req, res) => {
  const id = req.params.id;
  const employees = await db.collection("employees").find({
    realEstateAgencyId: new ObjectId(id),
  }).toArray();

  console.log('employees',employees)

  getAllEmployees(employees, req, res);
  
});


getAgenciesRouter.get("/own/employees", realEstateAgentMiddleware, async (req, res) => {
    console.log('Reached /own/employees route'); // Debug logging

    const id = req.user._id;
    console.log('id:', id); // Debug logging
  
    const agency = await db.collection("employees").findOne({
      userId: id,
    });
  
    console.log('agency:', agency); // Debug logging
  
    if (agency) {
      const employees = await db.collection("employees").find({
        realEstateAgencyId: agency.realEstateAgencyId,
      }).toArray();
  
      console.log('employees:', employees); // Debug logging
  
      getAllEmployees(employees, req, res);
    } else {
      return res.status(404).json({ error: "You are not assigned to a real estate agency." });
    }
  });




export {getAgenciesRouter};
