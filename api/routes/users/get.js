import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";
import { idSchema } from "../../validators/idValidator.js";

const getUsersRouter = express.Router();

// Get all users - (REAL ESTATE AGENT & ADMIN ROUTE)
getUsersRouter.get("/users", realEstateAgentMiddleware, async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.json(users);
});

// Get user by id - (REAL ESTATE AGENT & ADMIN ROUTE)
getUsersRouter.get("/users/:id", realEstateAgentMiddleware, async (req, res) => {
  const id = req.params.id;
  
  // Validation
  const { error, value } = idSchema.validate(id);

  if (error) {
       const errorArray = error.details.map((err) => err.message);
       return res.status(400).json({ errors: errorArray });
  }

  const user = await db.collection("users").findOne({
    _id: new ObjectId(id),
  });

  if (user) {
    delete user.password;
    return res.json(user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Get user role - (ADMIN ROUTE)
getUsersRouter.get("/users/:id/role", adminMiddleware, async (req, res) => {
  const id = req.params.id;

  // Validation
  const { error, value } = idSchema.validate(id);

  if (error) {
       const errorArray = error.details.map((err) => err.message);
       return res.status(400).json({ errors: errorArray });
  }

  const userRole = await db.collection("userRoles").findOne({
    userId: new ObjectId(id),
  });

  if (userRole) {
    return res.json(userRole);
  } else {
    return res.status(404).json({ error: "This user does not exist or doesn't have a role assigned." });
  }
});

export {getUsersRouter};
