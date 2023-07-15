import { Request, Response } from 'express';
import { IBook } from './book.interface';
import { updateBookDetailsService } from './book.service';
import catchAsync from '../../../utils/catchAsync';
import { sendSuccessResponse } from '../../../utils/responseSender';

export const updateBookDetails = catchAsync(async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const updates: Partial<IBook> = req.body;

    const updatedBook = await updateBookDetailsService(bookId, updates);

    sendSuccessResponse(res, updatedBook);
});