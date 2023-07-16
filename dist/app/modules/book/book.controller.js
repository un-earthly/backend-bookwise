"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBookDetails = exports.createBook = exports.getAllBooks = void 0;
const book_service_1 = require("./book.service");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const responseSender_1 = require("../../../utils/responseSender");
exports.getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genre, year, q, limit, page } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const books = yield (0, book_service_1.filterAndSearchBooksService)(String(genre), Number(year), String(q), pageNumber, pageSize);
    (0, responseSender_1.sendSuccessResponse)(res, books);
}));
exports.createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const newBook = yield (0, book_service_1.createBookService)(bookData);
    (0, responseSender_1.sendSuccessResponse)(res, newBook);
}));
exports.updateBookDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const updates = req.body;
    const updatedBook = yield (0, book_service_1.updateBookDetailsService)(bookId, updates);
    (0, responseSender_1.sendSuccessResponse)(res, updatedBook);
}));
exports.deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const deletedBook = yield (0, book_service_1.deleteBookService)(bookId);
    if (!deletedBook) {
        return res.status(404).json({ error: 'Book not found' });
    }
    (0, responseSender_1.sendSuccessResponse)(res, { message: 'Book deleted successfully' });
}));
