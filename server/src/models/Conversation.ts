// File: server/src/models/Conversation.ts

import mongoose, { Schema, Document } from 'mongoose';

// Define the Conversation document interface
export interface IConversation extends Document {
    participants: mongoose.Schema.Types.ObjectId[];
    messages: mongoose.Schema.Types.ObjectId[];
}

// Define the Conversation Schema
const conversationSchema: Schema<IConversation> = new mongoose.Schema(
    {
        // Array of user IDs participating in the conversation
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // References the User model
                required: true,
            },
        ],
        // Array of message IDs belonging to this conversation
       messages: [
            {
                type: mongoose.Schema.Types.ObjectId, // <-- MUST use Schema.Types.ObjectId
                ref: 'Message', 
                default: [],
            },
        ],
    },
    { timestamps: true }
);

const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema);

export default Conversation;