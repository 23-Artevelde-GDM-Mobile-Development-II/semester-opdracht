import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import { realEstateAgentMiddleware } from "../../middleware/realEstateAgentMiddleware.js";

const deleteUsersRouter = express.Router();

async function deleteUserData(userId, req, res) {
    try{
        await db.collection("users").deleteOne({
            _id: new ObjectId(userId),
          });
    }catch(err){
        return (res.status(400).json({error: err}))
    }
    
    try{
        await db.collection("userRoles").deleteOne({
            userId: new ObjectId(userId),
        });
    }catch(err){
        return (res.status(400).json({error: err}))
    }

    return res.json({message: 'User with matching role is succesfully removed.'})
}

// Remove user by id - (ADMIN ROUTE)
deleteUsersRouter.delete("/users/:id", adminMiddleware, async (req, res) => {
  const id = req.params.id;
  const user = await db.collection("users").findOne({
    _id: new ObjectId(id),
  });

  if(user){
    deleteUserData(id, req, res);
  }else{
    return res.status(404).json({message: 'User not found.'})
  }

  
});


deleteUsersRouter.delete("/loggedInUser", async (req, res) => {
    const loggedInUser = req.user;
  
    if(loggedInUser){
       
        deleteUserData(loggedInUser._id, req, res);
    }else{
        return res.status(403).json({message: 'Unauthorized'})
    }

  
});

export {deleteUsersRouter};


// authRouter.delete("/students/:id", async (req, res) => {
//   const id = req.params.id;

//   await db.collection("students").deleteOne({
//     _id: ObjectId(id),
//   });

//   res.json({});
// });