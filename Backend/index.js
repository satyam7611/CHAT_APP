import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoute from './router/user.route.js';
import cors from 'cookie-parser';
const app=express();
dotenv.config();
const port=process.env.PORT || 5000;
connectDb();

app.get('/',(req,res)=>{
    res.send("Backend working ! ")
})

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// route middleware
app.use(express.json())
app.use('/api/v1/users',userRoute);

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})