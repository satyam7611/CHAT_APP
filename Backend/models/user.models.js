import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
          name:{
            type:String,
            required:true
          },
          email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
          },
          password:{
            type:String,
            required:true
          },
          profilePhoto: {
            type: String,
            default: ""
          },
          profilePhoto_public_id: {
            type: String,
            default: ""
          }
},{timestamps:true})



const User=mongoose.model("User",userSchema);

export default User;