import express from 'express';
import { updateBookDetails } from './book.controller';

const router = express.Router();

router.put('/:bookId', updateBookDetails);

export default router;
