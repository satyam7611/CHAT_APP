import User from "../models/user.models.js";
import express from 'express';
import { signIn, signUp, logout, getUserProfile, updateProfilePhoto, removeProfilePhoto } from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import multer from 'multer';
import { profileStorage } from '../config/cloudinary.js';

const upload = multer({
  storage: profileStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/logout', logout);
router.get("/getUserProfile", secureRoute, getUserProfile);

// Profile photo actions with multer error handling
router.post("/update-profile-photo", secureRoute, (req, res, next) => {
  upload.single('profilePhoto')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Upload error: ${err.message}` });
      }
      return res.status(400).json({ message: err.message || "Failed to upload image" });
    }
    next();
  });
}, updateProfilePhoto);

router.post("/remove-profile-photo", secureRoute, removeProfilePhoto);

export default router;