import express from "express";
import { ObjectId } from "mongodb";

import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";

// Bcript to hash passwords
import bcrypt from 'bcrypt';
import { createAndUpadateUserRolesSchema, updateUserSchema } from "../../validators/userValidator.js";

const patchUsersRouter = express.Router();


async function updateUser(user, req, res) {
    
    // if user exists, update the data
    if (user) {
        const { _id, password, registeredOn , ...data } = req.body;

        // If there is a password given, it hashes the password.
        let hashPassword;
        const salt = await bcrypt.genSalt(10);
        if (password !== undefined) hashPassword = await bcrypt.hash(req.body.password, salt);
         

        const newData = { ...user, ...data };

        // Add the hashed password if the password is defined.
        if (hashPassword !== undefined) newData.password = hashPassword;

        await db.collection("users").replaceOne({ _id: user._id }, newData);

        return res.json(newData);
    } else {
        return res.status(404).json({ error: "User not found." });
    }
}

// update given user by id (ADMIN ROUTE)
patchUsersRouter.patch("/users/:id", adminMiddleware ,async (req, res) => {

    const id = req.params.id;

    // Validation
    const { error, value } = updateUserSchema.validate({ id, ...req.body }, { abortEarly: false });

    if (error) {
      const errorArray = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errorArray });
    }

    // check if user exists
    const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(id) });

    updateUser(user, req, res);
});



// update data from the user that's logged in
patchUsersRouter.patch("/loggedInUser", async (req, res) => {

    // Validation
    const { error, value } = updateUserSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }
    
    const loggedInUser = req.user;
    
    updateUser(loggedInUser, req, res)
});


// Update user roles (ADMIN ROUTE)
patchUsersRouter.patch("/users/:userId/role", adminMiddleware ,async (req, res) => {
    
    const userId = req.params.userId;
    const role = req.body.role;

    // Validation
    const { error, value } = createAndUpadateUserRolesSchema.validate({userId, role}, { abortEarly: false });

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }

    const userRole = await db.collection("userRoles").findOne({
        userId: new ObjectId(userId),
    });

    if (userRole) {
        const { userId, ...data } = value;
         
        const newData = { ...userRole, ...data };
        await db.collection("userRoles").replaceOne({ _id: userRole._id }, newData);

        return res.json(newData);

    } else {
        return res.status(404).json({ error: "This user does not exist or doesn't have a role assigned." });
    }
});


export { patchUsersRouter };