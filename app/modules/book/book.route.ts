import express from 'express';
import { createBook, deleteBook, getAllBooks, updateBookDetails } from './book.controller';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.put('/:bookId', updateBookDetails);
router.delete('/:bookId', deleteBook);

export default router;
