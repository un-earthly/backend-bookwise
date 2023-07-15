import express from 'express';
import { addToWishlist, updateBookReadingStatus } from './wishlist.controller';

const router = express.Router();


router.post('/', addToWishlist);
router.put('/:bookId', updateBookReadingStatus);

export default router;
