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
exports.deleteBookService = exports.updateBookDetailsService = exports.createBookService = exports.filterAndSearchBooksService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = require("../../../utils/ApiError");
const book_model_1 = __importDefault(require("./book.model"));
function filterAndSearchBooksService(genre, year, query, pageNumber = 1, pageSize = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = {};
        if (genre) {
            filter.genre = genre;
        }
        if (year) {
            filter.publicationDate = { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) };
        }
        if (query) {
            const searchRegex = new RegExp(query, 'i');
            filter.$or = [
                { title: { $regex: searchRegex } },
                { author: { $regex: searchRegex } },
                { genre: { $regex: searchRegex } },
            ];
        }
        const books = yield book_model_1.default.find(filter)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .exec();
        return books;
    });
}
exports.filterAndSearchBooksService = filterAndSearchBooksService;
function createBookService(bookData) {
    return __awaiter(this, void 0, void 0, function* () {
        const newBook = book_model_1.default.create(bookData);
        return newBook;
    });
}
exports.createBookService = createBookService;
function updateBookDetailsService(bookId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            throw new ApiError_1.ApiError('Book not found', http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        Object.assign(book, updates);
        return yield book.save();
    });
}
exports.updateBookDetailsService = updateBookDetailsService;
function deleteBookService(bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield book_model_1.default.findByIdAndDelete(bookId);
    });
}
exports.deleteBookService = deleteBookService;
