import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../../db/mongo.js";
import { idSchema } from "../../validators/idValidator.js";

const getMessagesRouter = express.Router();

// Get all messages 
getMessagesRouter.get("/inbox/all", async (req, res) => {
    const loggedInUser = req.user;

    if(loggedInUser){
        const inboxMessages = await db.collection("messages").find({
            receiverId: new ObjectId(loggedInUser._id)
        }).toArray();

        if(inboxMessages.length > 0){
            return res.json(inboxMessages);

        }else{
            res.status(404).json({message: "You have no messages."})
        }
    }else{
        return res.status('Unauthorized');
    }
    
});

getMessagesRouter.get("/sent/all", async (req, res) => {
    const loggedInUser = req.user;

    if(loggedInUser){
        const sentMessages = await db.collection("messages").find({
            senderId: new ObjectId(loggedInUser._id)
        }).toArray();


        if(sentMessages.length > 1){
            return res.json(sentMessages);

        }else{
            res.status(404).json({message: "You didn't sent any messages."})
        }
    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
    
});

getMessagesRouter.get("/:messageId", async (req, res) => {
    const loggedInUser = req.user;
    const messageId = req.params.messageId;

    // Validation of the id
    const { error } = idSchema.validate(messageId);

    if (error) {
        const errorArray = error.details.map((err) => err.message);
        return res.status(400).json({ errors: errorArray });
    }

    if (loggedInUser) {
        try {
          const conversation = {};
    
          // Retrieve the message with the given messageId
          const message = await db.collection("messages").findOne({
            _id: new ObjectId(messageId)
          });
    
          if (!message) {
            return res.status(404).json({ message: "There are no messages with this id." });
          }
    
          conversation.messageContent = message;
    
          // Retrieve the sender data by performing a left outer join with the "users" collection
          const sender = await db.collection("users").findOne({
            _id: new ObjectId(message.senderId)
          });
    
          if (!sender) {
            return res.status(404).json({ message: "Sender data not found." });
          }
    
          conversation.sender = sender;
    
          // Retrieve the real estate data by performing a left outer join with the "realEstates" collection
          const realEstate = await db.collection("realEstates").findOne({
            _id: new ObjectId(message.propertyId)
          });
    
          if (!realEstate) {
            return res.status(404).json({ message: "Real estate data not found." });
          }
    
          conversation.realEstate = realEstate;
    
          // Return the conversation object containing the message, sender, and real estate data
          res.json(conversation);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "An error occurred while retrieving the message data." });
        }

    }else{
        res.status('Unauthorized');
    }
    
});


export { getMessagesRouter};
