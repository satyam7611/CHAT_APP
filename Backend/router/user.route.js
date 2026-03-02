import User from "../models/user.models.js";
import express from 'express';
import { signIn, signUp,logout } from "../controller/user.controller.js";


const router=express.Router();
router.post('/signup',signUp);
router.post('/signin',signIn)
router.post('/logout',logout);

export default router;