import express from 'express';
import { createBook, deleteBook, getAllBooks, updateBookDetails } from './book.controller';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.put('/:bookId', updateBookDetails);
router.delete('/:bookId', deleteBook);
import Book, { IBook } from '../models/book';

// Existing service functions for CRUD operations
// ...

export async function filterBooksService(genre?: string, year?: number): Promise<IBook[]> {
    let filter: any = {};

    if (genre) {
        filter.genre = genre;
    }

    if (year) {
        filter.publicationDate = { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) };
    }

    return await Book.find(filter);
}


export default router;
