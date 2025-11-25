// File: server/src/controllers/messageController.ts

import mongoose from 'mongoose';
import { Request, Response } from "express";
import Conversation from "../models/Conversation"; 
import Message from "../models/Message"; 

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        
        // 1. Get and convert IDs
        const { id: receiverIdString } = req.params; 
        const receiverId = new mongoose.Types.ObjectId(receiverIdString);
        const senderId = req.user!._id; 

        // 2. Find or create the conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }, 
        });

        if (!conversation) {
            // 💡 FIX: Create a new conversation if none exists
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        
        // 🔑 FIX: DEFINE 'newMessage' HERE, AFTER 'conversation' is guaranteed to exist.
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        
        // 3. Add the new message ID to the conversation's messages array
       if (newMessage) {
            // 🔑 FINAL FIX: Convert to 'unknown' first to satisfy the strict compiler check (Code 2352)
            conversation.messages.push(
                newMessage._id as unknown as mongoose.Schema.Types.ObjectId
            ); 
        }     
        // 4. Run save operations in parallel for efficiency
        await Promise.all([conversation.save(), newMessage.save()]);

        // 5. TODO: Implement Socket.io to send the message in real-time

        res.status(201).json(newMessage);

    } catch (error) {
        let errorMessage = "Internal server error in sendMessage";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};
export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: userToChatIdString } = req.params;
        const userToChatId = new mongoose.Types.ObjectId(userToChatIdString);
        const senderId = req.user!._id; // Logged-in user's ID

        // 1. Find the conversation
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        })
        .populate("messages"); // IMPORTANT: Replace message IDs with actual message documents

        // If no conversation exists, return an empty array (valid state for new chat)
        if (!conversation) return res.status(200).json([]);

        // 2. Extract and send the messages
        const messages = conversation.messages;
        console.log("[DEBUG] Fetched messages count:", messages.length);
        console.log("[DEBUG] First message content (if exists):", messages.length > 0 ? messages[0] : "None");

        res.status(200).json(messages);

    } catch (error) {
        let errorMessage = "Internal server error in getMessages";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};