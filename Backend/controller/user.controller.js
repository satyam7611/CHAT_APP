import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
            return res.status(400).json({message:"User already exist !"});
        }
        const hashPassword= await bcrypt.hash(password,10);

        const newUser=await User.create({
            name,
            email,
            password:hashPassword,

        }) 
        return res.status(201).json({
            message:"User Registered Successfully !",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({message:"Something went wrong in creating of user"});
    }
}


export const signIn=async(req,res)=>{
try {
        const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message:'All fields are required!'});
    }

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid credentials !"});
    }

    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
    }

    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    return res.status(200).json({
        message:"Login Successfully !",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email

        }
    })
    
} catch (error) {
    console.log(error.message);
    return res.status(400).json({message:"unable to sign in !"})
    
}

}