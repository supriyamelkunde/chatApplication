import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
   participants :[{
    type: mongoose.Schema.Types.ObjectId,
    ref : "user"
   }],
   messages:[{
    type: mongoose.Schema.Types.ObjectId,
    ref : "messages"
   }]
    
},{
    timestamps:true
})

export const conversationModel = mongoose.model("conversation", conversationSchema)