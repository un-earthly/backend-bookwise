import mongoose from "mongoose";
import express from "express";
import { config } from "./config";
import { errorHandler } from "./app/middleware/globalErrorHandler";
require("dotenv").config()

const app = express();


mongoose
    .connect('mongodb://localhost/book_catalog',)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });


app.use(errorHandler);

app.listen(config.port, () => {
    console.log("app listening on port " + config.port)
})