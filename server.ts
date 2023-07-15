import mongoose from "mongoose";
import express from "express";
import { config } from "./config";
import { errorHandler } from "./app/middleware/globalErrorHandler";
import cors from "cors"
import router from "./app/routes";
require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json())

mongoose
    .connect('mongodb://localhost/book_catalog',)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });


app.use(errorHandler);
app.use("api/v1", router)


app.listen(config.port, () => {
    console.log("app listening on port " + config.port)
})