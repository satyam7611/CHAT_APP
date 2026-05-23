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
        maxlength:1000,
        trim:true,
        default: "",
    },
    fileUrl: {
        type: String,
        default: "",
    },
    fileType: {
        type: String,
        default: "",
    },
    public_id: {
        type: String,
        default: "",
    },
    originalName: {
        type: String,
        default: "",
    },
    duration: {
        type: Number,
        default: 0,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }

  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
