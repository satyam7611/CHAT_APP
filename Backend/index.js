import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoute from './router/user.route.js';
const app=express();
dotenv.config();
const port=process.env.PORT || 5000;
connectDb();

app.get('/',(req,res)=>{
    res.send("Hello world")
})

// route middleware
app.use(express.json())
app.use('/api/v1/users',userRoute);

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})