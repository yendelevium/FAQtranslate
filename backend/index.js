import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import FAQRouter from "./routes/faqs.js";
import path from "path"

// Loading .env file
dotenv.config();

// DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connection Successfull"))
    .catch(err => console.log("Failed to connect to mongoDB", err))

const app=express();

app.use(express.json());
app.use("/api/faq",FAQRouter);

const __dirname = path.resolve()
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    // On visiting any other path APART from the api endpoints, send the react index.html
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

// Error and 404 Handlers
app.use((err,req,res,next)=>{
    // console.log(err)
    res.status(400).json({error:err})
})

app.use("*",(req,res)=>{
    res.status(404).json({
        message:"404 Page not found"
    })
})

app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log(`Listening on http://localhost:${process.env.PORT}`);
})

export default app