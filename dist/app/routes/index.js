"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const book_route_1 = __importDefault(require("../modules/book/book.route"));
const book_route_2 = __importDefault(require("../modules/book/book.route"));
const Router = [
    {
        path: "/users",
        route: user_route_1.default
    },
    {
        path: "/book",
        route: book_route_1.default
    },
    {
        path: "/wishlist",
        route: book_route_2.default
    },
];
Router.map(r => router.use(r.path, r.route));
exports.default = router;
