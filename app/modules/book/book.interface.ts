import { Document, Schema } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: Array<Schema.Types.ObjectId>;
    genre: string;
    publicationDate: Date;
    description: string;
    pageCount: number;
    language: string;
    imageUrl: string;
    wishlist: Array<Schema.Types.ObjectId>;
    isFinishedReading: boolean;
    isCurrentlyReading: boolean;
}


