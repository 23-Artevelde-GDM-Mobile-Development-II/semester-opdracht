import "dotenv/config";

import express from "express";
import { db } from "../../db/mongo.js";


const adminRouter = express.Router();
    // middleware for authentication
adminRouter.use(async (req, res, next) => {
    const loggedInUser = req.user;
    console.log('loggedinUser',loggedInUser );

    if(loggedInUser !== undefined){

        const userRole = await db
        .collection("userRoles")
        .findOne({ userId: loggedInUser._id });
        console.log('userRole',userRole)

        if(userRole && userRole.role === 'admin'){
            return next();
        }else{
            return res.status(403).json({
                error: "Forbiddden, you don't have the correct role to access this route.",
            });
            }
        }

        return res.status(401).json({
            error: "Unauthorized",
        });


    })

// export the function for admin router 
export { adminRouter };


