import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../../utils/ApiError";
import { IBook } from "./book.interface";
import Book from "./book.model";


export async function filterAndSearchBooksService(
    genre?: string,
    year?: number,
    query?: string,
    pageNumber: number = 1,
    pageSize: number = 10
): Promise<IBook[]> {
    let filter: any = {};

    if (genre) {
        filter.genre = genre;
    }

    if (year) {
        filter.publicationDate = { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) };
    }

    if (query) {
        const searchRegex = new RegExp(query, 'i');
        filter.$or = [
            { title: { $regex: searchRegex } },
            { author: { $regex: searchRegex } },
            { genre: { $regex: searchRegex } },
        ];
    }

    return await Book.find(filter).skip((pageNumber - 1) * pageSize).limit(pageSize);
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
