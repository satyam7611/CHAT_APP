import express from 'express';
import { sendMessage, getMessages, getUnreadCounts, deleteMessage } from '../controller/message.controller.js';
import secureRoute from '../middleware/secureRoute.js'
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

// Setup multer storage using Cloudinary
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB size limit
  }
});

const router = express.Router();

// Custom route upload handler with file limits and errors processing
router.post("/send/:id", secureRoute, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Upload error: ${err.message}` });
      }
      return res.status(400).json({ message: err.message || "Failed to upload file to cloud storage" });
    }
    next();
  });
}, sendMessage);

router.get("/unread", secureRoute, getUnreadCounts);
router.get("/get/:id", secureRoute, getMessages);
router.post("/delete/:id", secureRoute, deleteMessage);

export default router;