import express from "express";
import { ObjectId } from "mongodb";

// Bcript to hash passwords
import bcrypt from 'bcrypt';
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { createAndUpadateUserRolesSchema, createUserSchema, loginSchema } from "../../validators/userValidator.js";


const postUsersRouter = express.Router();

// define a route to handle user login
postUsersRouter.post("/login", async (req, res) => {
    const { error, value } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorArray = [];
      error.details.map((err)=>{
        errorArray.push(err.message);
      })
      return res.status(400).json({ error: errorArray });
    }

    const email = value.email;
    
  
    // check if user exists in the database
    let user = await db.collection("users").findOne({ email });
    
  
    if (!user) {
      return res.status(401).json({
          error: "User doesn't exist",
      });
    }else{
      const validPassword = await bcrypt.compare(value.password, user.password);

      // Fetch user roles from the database
      const userRole = await db.collection("userRoles").findOne({ userId: user._id });
      
      if(userRole){
        // Include roles in the user object
        user.roles = userRole.role;
      }
  
      if (!validPassword){
          return res.status(401).json({error: 'Incorrect Password'})
      }else{
          delete user.password;
          return res.status(200).json(user);
      }
      
    }
  
    // send back the user object
   
});
  
postUsersRouter.post("/users/add", async (req, res) => {
    const { error, value } = createUserSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorArray = [];
      error.details.map((err)=>{
        errorArray.push(err.message);
      })
      return res.status(400).json({ error: errorArray });
    }


    const {firstname, lastname, email, phoneNr, password} = value;
    const salt = await bcrypt.genSalt(10);
  
    //   Hash given password
    const hashPassword = await bcrypt.hash(password, salt);
  
  
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
          registeredOn: Date.now()
      });

      // check if user exists in the database
      let user = await db.collection("users").findOne({ email });

      await db.collection("userRoles").insertOne({ 
        userId: user._id,
        role: 'regularUser',
      });

      const userRole = await db.collection("userRoles").findOne({ userId: user._id });

      if(userRole){
        // Include roles in the user object
        user.roles = userRole.role;
      }

      delete user.password;
      return res.json(user);
    }else{
      return res.status(400).json({
          error: 'User already exist with this email addres.',
      });
    }
  
  });
  

// Add role to a user - (ADMIN ROUTE) 
postUsersRouter.post("/users/:userId/role", adminMiddleware, async (req, res) => {
    const userId = req.params.userId;
    const role = req.body.role;

    // Validation
    const { error, value } = createAndUpadateUserRolesSchema.validate({userId, role}, { abortEarly: false });

    if (error) {
      const errorArray = [];
      error.details.map((err)=>{
        errorArray.push(err.message);
      })
      return res.status(400).json({ error: errorArray });
    }

    const user = await db.collection("users").findOne({
      _id: new ObjectId(userId),
    });
  
  
    if(!user){
      res.status(404).json({
        error: "User not found, so it's impossible to add a role to this person.",
      });
    }else{
      const assignedToUser = await db.collection("userRoles").findOne({
        userId:  new ObjectId(userId),
      });
  
      if(assignedToUser){
        res.status(400).json({
          message: 'A role has already been assigned to the user',
          role: assignedToUser.role
        });
      }else{
        const userRole = await db.collection("userRoles").insertOne({ 
          userId:  new ObjectId(userId),
          role: role
        });
        
        res.json({
          message: 'A role has been assigned to the user',
          id: userRole.insertedId
        });
      }
    }
    
});
  

export { postUsersRouter };