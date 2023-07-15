import { IBook } from "../book/book.interface";
import Book from "../book/book.model";
import { IWishlistItem } from "./wishlist.inteface";
import Wishlist from "./wishlist.model";

export async function addToWishlistService(userId: string, bookId: string, status: string): Promise<IWishlistItem> {
    const wishlistItem = new Wishlist({
        user: userId,
        book: bookId,
        status,
    });

    return await wishlistItem.save();
}


export async function updateBookReadingStatusService(bookId: string, updates: Partial<IBook>): Promise<IBook | null> {
    const book = await Book.findById(bookId);
    if (!book) {
        return null;
    }

    Object.assign(book, updates);
    return await book.save();
}
