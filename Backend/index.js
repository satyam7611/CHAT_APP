import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoute from './router/user.route.js';
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();
dotenv.config();
const port=process.env.PORT || 5000;
connectDb();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send("Backend working ! ")
})



// route middleware
app.use(express.json())
app.use('/api/v1/users',userRoute);

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})