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
exports.updateBookReadingStatus = exports.addToWishlist = void 0;
const wishlist_service_1 = require("./wishlist.service");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const responseSender_1 = require("../../../utils/responseSender");
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = require("../../../utils/ApiError");
exports.addToWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, userId, status } = req.body;
    const wishlistItem = yield (0, wishlist_service_1.addToWishlistService)(userId, bookId, status);
    if (!wishlistItem) {
        throw new ApiError_1.ApiError('Book not found', http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    (0, responseSender_1.sendSuccessResponse)(res, wishlistItem, http_status_codes_1.StatusCodes.CREATED);
}));
exports.updateBookReadingStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const { isFinishedReading, isCurrentlyReading } = req.body;
    const updates = {};
    if (isFinishedReading !== undefined) {
        updates.isFinishedReading = isFinishedReading;
    }
    if (isCurrentlyReading !== undefined) {
        updates.isCurrentlyReading = isCurrentlyReading;
    }
    const updatedBook = yield (0, wishlist_service_1.updateBookReadingStatusService)(bookId, updates);
    if (!updatedBook) {
        throw new ApiError_1.ApiError('Book not found', http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    (0, responseSender_1.sendSuccessResponse)(res, updatedBook);
}));
