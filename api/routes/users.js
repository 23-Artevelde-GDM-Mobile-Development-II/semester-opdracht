import "dotenv/config";

import express from "express";
import { ObjectId } from "mongodb";

// Bcript to hash passwords
import bcrypt from 'bcrypt';
import { db } from "../db/mongo.js";
import { adminRouter } from "../middleware/routers/admin.js";
import { realEstateAgentRouter } from "../middleware/routers/realEstateAgent.js";

// const realEstateAgentRouterUser = realEstateAgentRouter;


const userRouter = express.Router();

// define a route to handle user login
userRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
  
    // check if user exists in the database
    let user = await db.collection("users").findOne({ email });
  
    // if not, add user to the database
    if (!user) {
      return res.status(401).json({
          error: "User doesn't exist",
      });
    }else{
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword){
          return res.status(401).json({error: 'Incorrect Password'})
      }else{
          return res.status(200).json(user);
      }
      
    }
  
    // send back the user object
   
});
  
userRouter.post("/users/add", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
  
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phoneNr = req.body.phoneNr;
    //   Hash given password
    const hashPassword = await bcrypt.hash(req.body.password, salt);
  //   const userRole = req.body.role.userRole;
  //   const realEstateAgencyId = req.body.role.realEstateAgencyId;
  
  
  
    // check if user exists in the database
    let user = await db.collection("users").findOne({ email });
  
    // if not, add user to the database
    if (!user) {
      await db.collection("users").insertOne({ 
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNr: phoneNr,
          password: hashPassword,
          // role: {
          //     userRole: userRole,
          //     realEstateAgencyId: realEstateAgencyId
          // },
          registeredOn: Date.now()
       });
      user = await db.collection("users").findOne({ email });
      return res.json(user);
    }else{
      return res.status(400).json({
          error: 'User already exist with this email addres',
      });
    }
  
  });
  
// Add role to a user - (ADMIN ROUTE) 
adminRouter.post("/users/:id/role", async (req, res) => {
    console.log(req.user);
    const id = req.params.id;
    const role = req.body.role;
  
    const user = await db.collection("users").findOne({
      _id: new ObjectId(id),
    });
  
    console.log(user);
  
    if(!user){
      res.status(404).json({
        error: "User not found, so it's impossible to add a role to this person.",
      });
    }else{
      const assignedToUser = await db.collection("userRoles").findOne({
        userId:  new ObjectId(id),
      });
  
      console.log(assignedToUser);
  
      if(assignedToUser){
        res.status(400).json({
          message: 'A role has already been assigned to the user',
          role: assignedToUser.role
        });
      }else{
        const userRole = await db.collection("userRoles").insertOne({ 
          userId:  new ObjectId(id),
          role: role
        });
        
        res.json({
          message: 'A role has been assigned to the user',
          id: userRole.insertedId
        });
      }
    }
    
});


// async function getAllUsers(req, res) {
//     console.log(req.user);
//     const students = await db.collection("users").find().toArray();
//     res.json(students);
// }

// adminRouter.get("/users", getAllUsers);

//  Get all users - (REAL ESTATE AGENT  & ADMIN ROUTE)
realEstateAgentRouter.get("/users", async (req, res) => {
  console.log(req.user);
  const users = await db.collection("users").find().toArray();
  res.json(users);
});

//  Get user by id - (REAL ESTATE AGENT  & ADMIN ROUTE)
realEstateAgentRouter.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await db.collection("users").findOne({
    _id: new ObjectId(id),
  });

  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

//  Get user role - (ADMIN ROUTE)
adminRouter.get("/users/:id/role", async (req, res) => {
  const id = req.params.id;
  const userRole = await db.collection("userRoles").findOne({
    userId: new ObjectId(id),
  });

  if (userRole) {
    return res.json(userRole);
  } else {
    return res.status(404).json({ error: "This user does not exist or doesn't has a role assigned." });
  }
});

  

export { userRouter, adminRouter, realEstateAgentRouter };