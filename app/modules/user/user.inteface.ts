import  { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    addedBooks: Array<Schema.Types.ObjectId>;
    createdAt: Date;
    updatedAt: Date;
}
