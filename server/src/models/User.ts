import mongoose, { Document, Schema } from "mongoose";

// Define the interface for a User document
export interface IUser extends Document {
    fullName: string;
    username: string;
    password?: string; // Optional because we might exclude it in queries
    gender: 'male' | 'female';
    profilePic: string; // URL to the avatar
    createdAt: Date;
    updatedAt: Date;
    isOnline: boolean;
    lastSeen: Date;
}

const UserSchema = new Schema<IUser>(
    {
        fullName: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 6 },
        gender: { type: String, required: true, enum: ['male', 'female'] },
        profilePic: { type: String, default: "" },
        isOnline: { type: Boolean, default: false },
        lastSeen: { type: Date, default: Date.now },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

// Mongoose automatically creates the 'users' collection name from 'User'
const User = mongoose.model<IUser>("User", UserSchema);

export default User;