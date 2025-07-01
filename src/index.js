import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/db_connection.js";
import express from "express";

const app = express();

dotenv.config({
  path: "./env",
});

connectDB();

/*
//IIFE : It is a JavaScript function that is defined and executed immediately after it is created.
;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL} / ${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on Port ${process.env.PORT}`);
    });
  } catch 
    (error) {
      console.log("Error", error);
      throw error;
    };
  
})();
*/
