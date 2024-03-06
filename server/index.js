import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userController from "./controllers/userContorller.js";

dotenv.config(); // Load environment variables from .env file


const app = express();

// connect db

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
   console.log("DB is successfully connected");

   app.listen(process.env.PORT, () => {
     console.log(`App is listening to port: ${process.env.PORT}`)
   })
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userController);