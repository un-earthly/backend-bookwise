"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default
    .connect('mongodb://127.0.0.1:27017/book_catalog')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
});
app.use("/api/v1", routes_1.default);
app.use(globalErrorHandler_1.errorHandler);
app.get("/", (req, res) => {
    res.send("welcome");
});
app.listen(config_1.config.port, () => {
    console.log("app listening on port " + config_1.config.port);
});
