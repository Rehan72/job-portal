import {Company} from "../models/company.model.js"

export const registerCompany=async(req,res)=>{
    try {
        const {companyName}=req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false,
            })
        }
        const company=await Company.findOne({companyName});
        if(company){
            return res.status(400).json({
                message:"Company already exists",
                success:false,
            })
        }
        company= await Company.create({
            name:companyName,
            userId:req.id
        });
        return res.status(201).json({
            message:"Company registered successfully",
            company,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}


export const getCompany=async (req,res)=>{
    try {
        const userId=req.body;
        const companies=await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"No companies found",
                success:false,
            })
        }
        
    } catch (error) {
        console.log(error);
    }
}

// get company by id
export const getCompanyById=async (req,res)=>{
    try {
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false,
            })
        }
        return res.status(200).json({
            company,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}