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

        if(inboxMessages.length > 1){
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

    if(loggedInUser){

        const conversation = {};

        const message = await db.collection("messages").findOne({
            _id: new ObjectId(messageId)
        });

        if(message){
          conversation.messageContent = message;

          const isReply = await db.collection("messageReplies").findOne({
            messageId: new ObjectId(messageId)
          });

          if(isReply){
              const repliedMessage = await db.collection("messages").findOne({
                  _id: new ObjectId(isReply.repliedMessageId)
              }); 

              conversation.repliedMessage = repliedMessage;
          }else{
            conversation.repliedMessage = null;
          }


          res.json(conversation);
        }else{
          res.status(404).json({message: 'There are no messages with this id.'})
        }

    }else{
        res.status('Unauthorized');
    }
    
});


export { getMessagesRouter};
