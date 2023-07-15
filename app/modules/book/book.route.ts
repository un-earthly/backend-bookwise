import express from 'express';
import { createBook, getAllBooks, updateBookDetails } from './book.controller';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.put('/:bookId', updateBookDetails);

export default router;
