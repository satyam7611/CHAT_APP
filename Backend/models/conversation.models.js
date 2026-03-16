import mongoose from 'mongoose';
import User from './user.models.js';
import Message from './message.models.js';
const conversationSchema=new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{timestamps:true})


const Conversation=mongoose.model("Conversation",conversationSchema)

export default Conversation;