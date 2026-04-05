import express from 'express';
import { sendMessage, getMessages, getUnreadCounts, deleteMessage } from '../controller/message.controller.js';
import secureRoute from '../middleware/secureRoute.js'
import multer from 'multer';

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const router=express.Router();
// below created the post route for the send and get message all
router.post("/send/:id", secureRoute, upload.single('file'), sendMessage);
router.get("/unread", secureRoute, getUnreadCounts);
router.get("/get/:id",secureRoute,getMessages);
router.post("/delete/:id", secureRoute, deleteMessage);

export default router;