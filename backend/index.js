import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/FAQtranslate')
    .then(()=>console.log("Connection Successfull"))
    .catch(err => console.log("Failed to connect to mongoDB", err))

// Loading .env file
dotenv.config();
const app=express();

app.get("/",(req,res)=>{
    res.send("What's up?");
})

app.listen(process.env.PORT,()=>{
    console.log(`Listening on http://localhost:${process.env.PORT}`);
})