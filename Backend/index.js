import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoute from './router/user.route.js';
import messageRoute from './router/message.route.js'
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./SocketIO/server.js";

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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
app.use('/api/message',messageRoute)

server.listen(port, () => {
    console.log(`server running on ${port}`);
});