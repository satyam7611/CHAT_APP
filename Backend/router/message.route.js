import express from 'express';
import { sendMessage,getMessages } from '../controller/message.controller.js';
import secureRoute from '../middleware/secureRoute.js'
const router=express.Router();
// below created the post route for the send and get message all
router.post("/send/:id",secureRoute,sendMessage);
router.get("/get/:id",secureRoute,getMessages);

export default router;