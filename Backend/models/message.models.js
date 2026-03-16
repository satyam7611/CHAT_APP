import mongoose from "mongoose";
import User from './user.models.js';
const messageSchema = new mongoose.Schema(
  {
    senderId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true,
        maxlength:1000,
        trim:true,
        validate:[
          {
            validator:(value)=>value.length>0,
          message:"Message can not be empty"
          },
         
        ],
    },

  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
