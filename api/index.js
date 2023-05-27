import "dotenv/config";

import express from "express";
import { ObjectId } from "mongodb";
import { db } from "./db/mongo.js";
import { registerMiddleware } from "./middleware/index.js";

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
import { getMessagesRouter } from "./routes/messages/get.js";
import { idSchema } from "./validators/idValidator.js";



// create an Express app
const app = express();

// set the port for the server to listen on
const port = process.env.PORT;

// register middleware
registerMiddleware(app);


app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    const { error } = idSchema.validate(req.headers.authorization);

    if (error) {
      const errorArray = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errorArray });
    }

    // check if user with id exists
    const user = await db.collection("users").findOne({ _id: new ObjectId(req.headers.authorization) });

    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
  } else {
    req.user = undefined;
    return next();
  }
});



// Routes to create, delete, update or get users
app.use(postUsersRouter, getUsersRouter, patchUsersRouter, deleteUsersRouter);

app.use('/realEstateAgencies', postAgenciesRouter, getAgenciesRouter, patchAgenciesRouter, deleteRealEstateAgenciesRouter);

app.use('/realEstates', postRealEstatesRouter, patchRealEstatesRouter, getRealEstatesRouter, deleteRealEstatesRouter);

app.use('/myFavorites', postFavoritesRouter, getFavoritesRouter, deleteFavoritesRouter);

app.use('/myMessages', postMessagesRouter, patchMessagesRouter, getMessagesRouter);



app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`);
});

// make sure database is closed when server crashes
const closeServer = () => {
  process.exit();
};

process.on("SIGINT", () => closeServer());
process.on("SIGTERM", () => closeServer());
