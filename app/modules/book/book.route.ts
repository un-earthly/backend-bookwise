import express from 'express';
import { createBook, updateBookDetails } from './book.controller';

const router = express.Router();


router.post('/', createBook);
router.put('/:bookId', updateBookDetails);

export default router;
