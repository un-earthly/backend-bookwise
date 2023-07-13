import mongoose from "mongoose";
import express from "express";
import { config } from "./config";
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




app.listen(config.port, () => {
    console.log("app listening on port " + config.port)
})