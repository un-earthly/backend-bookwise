import mongoose, { Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        publicationDate: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        pageCount: {
            type: Number,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const Book = mongoose.model<IBook>('Book', bookSchema);
export default Book