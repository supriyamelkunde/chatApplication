// const express = require ("express"); method-1 
import express from "express"; //method-2
const app = express();
import dotenv from "dotenv";
import dbconnect from "./config/connect.js";


//middleware
app.use(express.json());


dotenv.config({});
const PORT = process.env.PORT || 5000;

//routes
import userRouter from "./routes/userRoutes.js";
app.use("/api/v1/user", userRouter);

app.listen(PORT, ()=>{
    console.log(`Server listen at port ${PORT}`);
    dbconnect();
})