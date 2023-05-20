// import "dotenv/config";

// import express from "express";
// import { ObjectId } from "mongodb";

// import { db } from "../../db/mongo.js";
// import { adminRouter } from "../../middleware/routers/admin.js";
// import { realEstateAgentRouter } from "../../middleware/routers/realEstateAgent.js";

// const userRouter = express.Router();


// // async function getAllUsers(req, res) {
// //     console.log(req.user);
// //     const students = await db.collection("users").find().toArray();
// //     res.json(students);
// // }

// // adminRouter.get("/users", getAllUsers);

// //  Get all users - (REAL ESTATE AGENT  & ADMIN ROUTE)
// realEstateAgentRouter.get("/users", async (req, res) => {
//   console.log(req.user);
//   const users = await db.collection("users").find().toArray();
//   res.json(users);
// });

// //  Get user by id - (REAL ESTATE AGENT  & ADMIN ROUTE)
// realEstateAgentRouter.get("/users/:id", async (req, res) => {
//   const id = req.params.id;
//   const user = await db.collection("users").findOne({
//     _id: new ObjectId(id),
//   });

//   if (user) {
//     return res.json(user);
//   } else {
//     return res.status(404).json({ error: "User not found" });
//   }
// });

// //  Get user role - (ADMIN ROUTE)
// adminRouter.get("/users/:id/role", async (req, res) => {
//   const id = req.params.id;
//   const userRole = await db.collection("userRoles").findOne({
//     userId: new ObjectId(id),
//   });

//   if (userRole) {
//     return res.json(userRole);
//   } else {
//     return res.status(404).json({ error: "This user does not exist or doesn't has a role assigned." });
//   }
// });

  

// export { userRouter, adminRouter, realEstateAgentRouter };


import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";

const getUsersRouter = express.Router();
// const realEstateAgentRouter = express.Router();

// Get all users - (REAL ESTATE AGENT & ADMIN ROUTE)
getUsersRouter.get("/users", realEstateAgentMiddleware, async (req, res) => {
  console.log(req.user);
  const users = await db.collection("users").find().toArray();
  res.json(users);
});

// Get user by id - (REAL ESTATE AGENT & ADMIN ROUTE)
getUsersRouter.get("/users/:id", realEstateAgentMiddleware, async (req, res) => {
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

// Get user role - (ADMIN ROUTE)
getUsersRouter.get("/users/:id/role", adminMiddleware, async (req, res) => {
  const id = req.params.id;
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
