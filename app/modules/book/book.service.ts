import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../../utils/ApiError";
import { IBook } from "./book.interface";
import Book from "./book.model";


export async function getAllBooksService(): Promise<IBook[]> {
    return await Book.find();
}


export async function createBookService(bookData: IBook): Promise<IBook> {
    const newBook = Book.create(bookData);
    return newBook
}


export async function updateBookDetailsService(bookId: string, updates: Partial<IBook>): Promise<IBook | null> {
    const book = await Book.findById(bookId);

    if (!book) {
        throw new ApiError('Book not found', StatusCodes.NOT_FOUND);
    }

    Object.assign(book, updates);
    return await book.save();
}


export async function deleteBookService(bookId: string): Promise<IBook | null> {
    return await Book.findByIdAndDelete(bookId);
}