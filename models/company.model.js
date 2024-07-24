import mongoose from "mongoose";
const companySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        
    },
    webSite:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    logo:{
        type:String,// URl to company logo
      
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})
export const company =mongoose.model('Company',companySchema)