import { Request, Response } from 'express';
import { addToWishlistService, updateBookReadingStatusService } from './wishlist.service';
import { IBook } from '../book/book.interface';
import catchAsync from '../../../utils/catchAsync';
import { sendSuccessResponse } from '../../../utils/responseSender';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../../utils/ApiError';

export const addToWishlist = catchAsync(async (req: Request, res: Response) => {
    const { bookId, userId, status } = req.body;

    const wishlistItem = await addToWishlistService(userId, bookId, status);

    if (!wishlistItem) {
        throw new ApiError('Book not found', StatusCodes.NOT_FOUND);
    }

    sendSuccessResponse(res, wishlistItem, StatusCodes.CREATED);
});

export const updateBookReadingStatus = catchAsync(async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const { isFinishedReading, isCurrentlyReading } = req.body;
    const updates: Partial<IBook> = {};

    if (isFinishedReading !== undefined) {
        updates.isFinishedReading = isFinishedReading;
    }

    if (isCurrentlyReading !== undefined) {
        updates.isCurrentlyReading = isCurrentlyReading;
    }

    const updatedBook = await updateBookReadingStatusService(bookId, updates);
    if (!updatedBook) {
        throw new ApiError('Book not found', StatusCodes.NOT_FOUND);
    }

    sendSuccessResponse(res, updatedBook);
});