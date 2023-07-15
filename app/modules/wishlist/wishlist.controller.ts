import { Request, Response } from 'express';
import { addToWishlistService, updateBookReadingStatusService } from './wishlist.service';
import { IBook } from '../book/book.interface';

export async function addToWishlist(req: Request, res: Response) {
    const { bookId, userId, status } = req.body;

    try {
        const wishlistItem = await addToWishlistService(userId, bookId, status);
        res.status(201).json(wishlistItem);
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

export async function updateBookReadingStatus(req: Request, res: Response) {
    const { bookId } = req.params;
    const { isFinishedReading, isCurrentlyReading } = req.body;
    const updates: Partial<IBook> = {};

    if (isFinishedReading !== undefined) {
        updates.isFinishedReading = isFinishedReading;
    }

    if (isCurrentlyReading !== undefined) {
        updates.isCurrentlyReading = isCurrentlyReading;
    }

    try {
        const updatedBook = await updateBookReadingStatusService(bookId, updates);
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating book status:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
