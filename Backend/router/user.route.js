import User from "../models/user.models.js";
import express from 'express';
import { signIn, signUp,logout ,getUserProfile } from "../controller/user.controller.js";

import secureRoute from "../middleware/secureRoute.js";
const router=express.Router();
router.post('/signup',signUp);
router.post('/signin',signIn)
router.post('/logout',logout);

router.get("/getUserProfile", secureRoute,getUserProfile);

export default router;