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
exports.updateBookReadingStatusService = exports.addToWishlistService = void 0;
const book_model_1 = __importDefault(require("../book/book.model"));
const wishlist_model_1 = __importDefault(require("./wishlist.model"));
function addToWishlistService(userId, bookId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const wishlistItem = new wishlist_model_1.default({
            user: userId,
            book: bookId,
            status,
        });
        return yield wishlistItem.save();
    });
}
exports.addToWishlistService = addToWishlistService;
function updateBookReadingStatusService(bookId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            return null;
        }
        Object.assign(book, updates);
        return yield book.save();
    });
}
exports.updateBookReadingStatusService = updateBookReadingStatusService;
