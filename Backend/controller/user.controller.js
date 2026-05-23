import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createTokenAndSaveCookie from '../jwt/generateToken.js';
import { cloudinary } from "../config/cloudinary.js";
export const signUp=async(req,res)=>{
    try {
        const {name,email,password ,confirmPassword}= req.body;
        if(!name || !email || ! password ){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"Password do not match"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User Already exist !"});
        }
        const hashPassword= await bcrypt.hash(password,10);

        const newUser=await User.create({
            name,
            email,
            password:hashPassword,

        }) 
        if(newUser){
           createTokenAndSaveCookie(newUser._id,res)
             res.status(201).json({
            message:"User Registered Successfully !",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                profilePhoto: newUser.profilePhoto || ""
            }
        })
        }
      

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({message:"Something went wrong in creating of user"});
    }
}


export const signIn=async(req,res)=>{
try {
        const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message:'All Fields are required!'});
    }

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid Credentials !"});
    }

    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
    }

  // 4️⃣ Create token & save in cookie
    createTokenAndSaveCookie(user._id, res);

    // 5️⃣ Send response
    return res.status(200).json({
      message: "Login Successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto || ""
      },
    });


    
} catch (error) {
    console.log(error.message);
    return res.status(400).json({message:"Unable to sign in !"})
    
}

}


export const logout=async(req,res)=>{
    try {
        res.clearCookie('jwt');
        res.status(200).json({message:"Logged out successfully !"});
    } catch (error) {
        res.status(400).json({message:"User did not logout something went wrong !"})
    }
}

// get all user from db;

export const getUserProfile=async(req,res)=>{
try {
    const loggedInUser = req.user.id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
}

export const updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user._id;
    const profilePhoto = req.file.path; // Cloudinary secure URL
    const profilePhoto_public_id = req.file.filename; // Cloudinary public ID

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePhoto, profilePhoto_public_id },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "Profile photo updated successfully!",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePhoto: updatedUser.profilePhoto
      }
    });
  } catch (error) {
    console.error("Error in updateProfilePhoto:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeProfilePhoto = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profilePhoto_public_id) {
      try {
        await cloudinary.uploader.destroy(user.profilePhoto_public_id);
      } catch (cloudinaryErr) {
        console.error("Cloudinary profile photo deletion failed:", cloudinaryErr);
      }
    }

    user.profilePhoto = "";
    user.profilePhoto_public_id = "";
    await user.save();

    return res.status(200).json({
      message: "Profile photo removed successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: ""
      }
    });
  } catch (error) {
    console.error("Error in removeProfilePhoto:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};