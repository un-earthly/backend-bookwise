import { Request, Response } from 'express';
import { IBook } from './book.interface';
import { createBookService, deleteBookService, getAllBooksService, updateBookDetailsService } from './book.service';
import catchAsync from '../../../utils/catchAsync';
import { sendSuccessResponse } from '../../../utils/responseSender';


export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
    const allBooks = await getAllBooksService();
    sendSuccessResponse(res, allBooks);
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