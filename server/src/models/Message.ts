// File: server/src/models/Message.ts

import mongoose, { Schema, Document } from 'mongoose';

// 🔑 FIX: Define the IMessage interface here (before its first use)
export interface IMessage extends Document {
    // Assuming your schema will use these fields:
    senderId: mongoose.Schema.Types.ObjectId;
    receiverId: mongoose.Schema.Types.ObjectId;
    message: string;
}

// Define the Message Schema
// 🔑 FIX: This is the line where the error was occurring (Ln 7)
const messageSchema: Schema<IMessage> = new mongoose.Schema( 
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;