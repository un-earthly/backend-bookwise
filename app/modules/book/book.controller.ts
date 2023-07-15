import { Request, Response } from 'express';
import { IBook } from './book.interface';
import { createBookService, deleteBookService, filterAndSearchBooksService, updateBookDetailsService } from './book.service';
import catchAsync from '../../../utils/catchAsync';
import { sendSuccessResponse } from '../../../utils/responseSender';


export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
    const { genre, year, q, limit, page } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 10;
    const books = await filterAndSearchBooksService(String(genre), Number(year), String(q), pageNumber, pageSize);
    sendSuccessResponse(res, books);
});


export const createBook = catchAsync(async (req: Request, res: Response) => {
    const bookData: IBook = req.body;
    const newBook = await createBookService(bookData);

    sendSuccessResponse(res, newBook);
});

export const updateBookDetails = catchAsync(async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const updates: Partial<IBook> = req.body;

    const updatedBook = await updateBookDetailsService(bookId, updates);

    sendSuccessResponse(res, updatedBook);
});



export const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const { bookId } = req.params;

    const deletedBook = await deleteBookService(bookId);
    if (!deletedBook) {
        return res.status(404).json({ error: 'Book not found' });
    }

    sendSuccessResponse(res, { message: 'Book deleted successfully' });
});

