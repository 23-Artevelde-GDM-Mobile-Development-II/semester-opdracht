import "dotenv/config";

import express from "express";
import { ObjectId } from "mongodb";
import { initClient } from "./db/mongo.js";
import { registerMiddleware } from "./middleware/index.js";

// Bcript to hash passwords
import bcrypt from 'bcrypt';
// const saltRounds = 10;

// create an Express app
const app = express();

// set the port for the server to listen on
const port = 3002;

// register middleware
registerMiddleware(app);

// initialize MongoDB client and database
const client = await initClient();
const db = client.db("immo_platform");

// define a route to handle user login
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  

  // check if user exists in the database
  let user = await db.collection("users").findOne({ email });

  // if not, add user to the database
  if (!user) {
    res.status(401).json({
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

app.post("/users/add", async (req, res) => {
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
    res.json(user);
  }else{
    res.status(400).json({
        error: 'User already exist with this email addres',
    });
  }

});

// define a router for authenticated routes
const authRouter = express.Router();

// middleware for authentication
authRouter.use(async (req, res, next) => {
  // check if authorization header exists
  if (req.headers.authorization) {
    // check if user with id exists
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.headers.authorization) });
    // if user exists, pass user object to the request object
    if (user) {
      req.user = user;
      return next();
    }
  }
  // if user not authenticated, send back 401 error
  res.status(401).json({
    error: "Unauthorized",
  });
});

// define a route to get all students
authRouter.get("/students", async (req, res) => {
  console.log(req.user);
  const students = await db.collection("students").find().toArray();
  res.json(students);
});

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

app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    // check if user with id exists
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.headers.authorization) });
    // exists? pass user to request
    console.log('test')
    if (user) {
      req.user = user;
      return next();
    }
  }
  res.status(401).json({
    error: "Unauthorized",
  });
}, authRouter);

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