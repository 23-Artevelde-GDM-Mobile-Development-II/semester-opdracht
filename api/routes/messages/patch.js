import express from "express";
import { ObjectId } from "mongodb";

import { db } from "../../db/mongo.js";
import { updateMessageSchema } from "../../validators/messagesValidator.js";

const patchMessagesRouter = express.Router();


// send a new message
patchMessagesRouter.patch("/:messageId", async (req, res) => {
    const {messageId} = req.params;
    const loggedInUser = req.user;
    const isRead = req.body.isRead;

    const { error } = updateMessageSchema.validate({messageId, isRead}, {abortEarly: false });

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }  
   

    if(loggedInUser){
        // check if the reciever with the given id exist.
        const receiverId = loggedInUser._id;
        let receiver = await db.collection("users").findOne({_id: new ObjectId(receiverId)});
 
        if (receiver) {
            
            const message = await db
            .collection("messages")
            .findOne({ _id: new ObjectId(messageId) });

            if(message){
                const newData = { ...message,  isRead};
                await db.collection("messages").replaceOne({ _id: message._id }, newData);
                return res.json({message: 'The reading status of this message is succesfully updated.'});
            }else{
                return res.status(404).json({message: 'The message has not been not found.'})
            }

        }else{
        return res.status(400).json({
            error: 'There are no users with this id.',
        });
        
        }
    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
   
});



  

export { patchMessagesRouter };