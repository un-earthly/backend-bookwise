import { IBook } from "./book.interface";
import Book from "./book.model";

export async function updateBookDetailsService(bookId: string, updates: Partial<IBook>): Promise<IBook | null> {
    const book = await Book.findById(bookId);
    if (!book) {
        return null;
    }

    Object.assign(book, updates);
    return await book.save();
}
