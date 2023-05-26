import express from "express";
import { ObjectId } from "mongodb";

import { db } from "../../db/mongo.js";

const postMessagesRouter = express.Router();

async function sendMessage(sender, receiverId, realEstateId, messageText, repliedMessageId, res) {

    if(sender){
        // check if the reciever with the given id exist.
        const senderId = sender._id;
        let receiver = await db.collection("users").findOne({_id: new ObjectId(receiverId)});
 
        if (receiver) {
            
            try {
                const message = await db.collection("messages").insertOne({ 
                    messageText,
                    senderId,
                    receiverId: new ObjectId(receiver._id),
                    propertyId: new ObjectId(realEstateId),
                    isRead: false,
                    sendOn: Date.now()
                });


                if(repliedMessageId){
                    await db.collection("messageReplies").insertOne({ 
                        messageId: message.insertedId,
                        repliedMessageId: new ObjectId(repliedMessageId),
                    });
                }
                
            } catch (error) {
                return res.json({error});
            }
        
    
        return res.json({message: `Message is succesfully send.`});

        }else{
        return res.status(400).json({
            error: 'There are no users with this id.',
        });
        
        }
    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
}

// send a new message
postMessagesRouter.post("/sendMessage", async (req, res) => {
    const {receiverId, realEstateId, messageText} = req.body;
    const loggedInUser = req.user;

    sendMessage(loggedInUser, receiverId, realEstateId, messageText, undefined, res);
   
});


postMessagesRouter.post("/sendReply", async (req, res) => {
    const {receiverId, realEstateId, messageText, repliedMessageId} = req.body;
    const loggedInUser = req.user;

    sendMessage(loggedInUser, receiverId, realEstateId, messageText, repliedMessageId, res);
   
});


  

export { postMessagesRouter };