import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.inteface";

const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        contact: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User
