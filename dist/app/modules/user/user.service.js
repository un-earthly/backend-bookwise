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
exports.loginUserService = exports.registerUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = require("../../../utils/ApiError");
const user_model_1 = __importDefault(require("./user.model"));
function registerUserService(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, contact, username } = userData;
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            throw new ApiError_1.ApiError('Email already registered', http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_model_1.default({ email, password: hashedPassword, username, contact });
        return yield newUser.save();
    });
}
exports.registerUserService = registerUserService;
function loginUserService(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(email);
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw new ApiError_1.ApiError('Invalid email or password', http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError_1.ApiError('Invalid email or password', http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        return user;
    });
}
exports.loginUserService = loginUserService;
