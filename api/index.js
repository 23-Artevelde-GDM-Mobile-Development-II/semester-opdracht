import "dotenv/config";

import express from "express";
import { ObjectId } from "mongodb";
import { db } from "./db/mongo.js";
import { registerMiddleware } from "./middleware/index.js";
// import {userRouter, adminRouter as adminRouterUser, realEstateAgentRouter as realEstateAgentRouterUser} from "./routes/users.js";

import { getUsersRouter } from "./routes/users/get.js";
import { postUsersRouter } from "./routes/users/post.js";
import { patchUsersRouter } from "./routes/users/patch.js";
import { deleteUsersRouter } from "./routes/users/delete.js";

import { postAgenciesRouter } from "./routes/realEstateAgencies/post.js";
import { patchAgenciesRouter } from "./routes/realEstateAgencies/patch.js";
import { getAgenciesRouter } from "./routes/realEstateAgencies/get.js";
import { deleteRealEstateAgenciesRouter } from "./routes/realEstateAgencies/delete.js";
import { postRealEstatesRouter } from "./routes/realEstate/post.js";
import { patchRealEstatesRouter } from "./routes/realEstate/patch.js";
import { getRealEstatesRouter } from "./routes/realEstate/get.js";
import { deleteRealEstatesRouter } from "./routes/realEstate/delete.js";
import { postFavoritesRouter } from "./routes/favorites/post.js";
import { getFavoritesRouter } from "./routes/favorites/get.js";
import { deleteFavoritesRouter } from "./routes/favorites/delete.js";
import { postMessagesRouter } from "./routes/messages/post.js";
import { patchMessagesRouter } from "./routes/messages/patch.js";



// create an Express app
const app = express();

// set the port for the server to listen on
const port = process.env.PORT;

// register middleware
registerMiddleware(app);

// initialize MongoDB client and database
// const client = await initClient();
// const db = client.db("immo_platform");


app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    // check if user with id exists
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.headers.authorization) });
    // exists? pass user to request
    console.log(req.headers)
    if (user) {
      req.user = user;
      return next();
    }else{
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
  }else{
    req.user = undefined;
    return next();
  }
  // res.status(401).json({
  //   error: "Unauthorized",
  // });
});



// Routes to create, delete, update or get users
app.use(postUsersRouter, getUsersRouter, patchUsersRouter, deleteUsersRouter);

app.use('/realEstateAgencies', postAgenciesRouter, getAgenciesRouter, patchAgenciesRouter, deleteRealEstateAgenciesRouter);

app.use('/realEstates', postRealEstatesRouter, patchRealEstatesRouter, getRealEstatesRouter, deleteRealEstatesRouter);

app.use('/myFavorites', postFavoritesRouter, getFavoritesRouter, deleteFavoritesRouter);

app.use('/myMessages', postMessagesRouter, patchMessagesRouter);
// app.use(adminRouterGetUser);
// app.use(realEstateAgentRouterGetUser);

// app.use(postUserRouter)
// app.use(adminRouterPostUser);
// app.use(realEstateAgentRouterPostUser);

// middleware for authentication
// authRouter.use(async (req, res, next) => {
//   // console.log('headers',headers);
//   // check if authorization header exists
//   if (req.headers.authorization) {
//     // check if user with id exists
//     const user = await db
//       .collection("users")
//       .findOne({ _id: new ObjectId(req.headers.authorization) });
//     // if user exists, pass user object to the request object
//     if (user) {
//       req.user = user;
//       return next();
//     }
//   }
//   // if user not authenticated, send back 401 error
//   res.status(401).json({
//     error: "Unauthorized",
//   });
// });


// // define a route to handle user login
// app.post("/login", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
  

//   // check if user exists in the database
//   let user = await db.collection("users").findOne({ email });

//   // if not, add user to the database
//   if (!user) {
//     res.status(401).json({
//         error: "User doesn't exist",
//     });
//   }else{
//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword){
//         return res.status(401).json({error: 'Incorrect Password'})
//     }else{
//         return res.status(200).json(user);
//     }
    
//   }

//   // send back the user object
 
// });

// app.post("/users/add", async (req, res) => {
//   const salt = await bcrypt.genSalt(10);

//   const firstname = req.body.firstname;
//   const lastname = req.body.lastname;
//   const email = req.body.email;
//   const phoneNr = req.body.phoneNr;
//   //   Hash given password
//   const hashPassword = await bcrypt.hash(req.body.password, salt);
// //   const userRole = req.body.role.userRole;
// //   const realEstateAgencyId = req.body.role.realEstateAgencyId;



//   // check if user exists in the database
//   let user = await db.collection("users").findOne({ email });

//   // if not, add user to the database
//   if (!user) {
//     await db.collection("users").insertOne({ 
//         firstname: firstname,
//         lastname: lastname,
//         email: email,
//         phoneNr: phoneNr,
//         password: hashPassword,
//         // role: {
//         //     userRole: userRole,
//         //     realEstateAgencyId: realEstateAgencyId
//         // },
//         registeredOn: Date.now()
//      });
//     user = await db.collection("users").findOne({ email });
//     res.json(user);
//   }else{
//     res.status(400).json({
//         error: 'User already exist with this email addres',
//     });
//   }

// });


// // adminRouter.post("/users/:id/role", async (req, res) => {
// //   console.log(req.user);
// //   const id = req.params.id;
// //   const role = req.body.role;

// //   const user = await db.collection("users").findOne({
// //     _id: new ObjectId(id),
// //   });

// //   console.log(user);

// //   if(!user){
// //     res.status(404).json({
// //       error: "User not found, so it's impossible to add a role to this person.",
// //     });
// //   }else{
// //     const assignedToUser = await db.collection("userRoles").findOne({
// //       userId:  new ObjectId(id),
// //     });

// //     console.log(assignedToUser);

// //     if(assignedToUser){
// //       res.status(400).json({
// //         message: 'A role has already been assigned to the user',
// //         role: assignedToUser.role
// //       });
// //     }else{
// //       const userRole = await db.collection("userRoles").insertOne({ 
// //         userId:  new ObjectId(id),
// //         role: role
// //       });
      
// //       res.json({
// //         message: 'A role has been assigned to the user',
// //         id: userRole.insertedId
// //       });
// //     }
// //   }
  
// // });



// __________________________________________________________________________________


// define a route to get all students
// authRouter.get("/students", async (req, res) => {
//   console.log(req.user);
//   const students = await db.collection("students").find().toArray();
//   res.json(students);
// });

// define a route to add a new student
// authRouter.post("/students", async (req, res) => {
//   const student = {
//     image:
//       "https://picsum.photos/200/300",
//     ...req.body,
//   };

//   await db.collection("students").insertOne(student);

//   // return added student
//   res.json(student);
// });

// // define a route to get a student by id
// authRouter.get("/students/:id", async (req, res) => {
//   const id = req.params.id;
//   const student = await db.collection("students").findOne({
//     _id: ObjectId(id),
//   });

//   // if student exists, send back student object
//   if (student) {
//     res.json(student);
//   } else {
//     // if student not found, send back 404 error
//     res.status(404).json({ error: "Not found" });
//   }
// });

// define a route to update a student by id
// authRouter.patch("/students/:id", async (req, res) => {
//   const id = req.params.id;

//   // check if student exists
//   const student = await db
//     .collection("students")
//     .findOne({ _id: ObjectId(id) });

//   // if student exists, update student data
//   if (student) {
//     const { _id, ...data } = req.body;
//     const newData = { ...student, ...data };
//     await db.collection("students").replaceOne({ _id: ObjectId(id) }, newData);

//     res.json(newData);
//   } else {
//     res.status(404).json({ error: "Not found" });
//   }
// });

// // DELETE
// authRouter.delete("/students/:id", async (req, res) => {
//   const id = req.params.id;

//   await db.collection("students").deleteOne({
//     _id: ObjectId(id),
//   });

//   res.json({});
// });



app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`);
});

// make sure database is closed when server crashes
const closeServer = () => {
  // default
  process.exit();
};

process.on("SIGINT", () => closeServer());
process.on("SIGTERM", () => closeServer());
//https://www.geeksforgeeks.org/node-js-process-signal-events/