import { Job } from "../models/job.model.js";


export const postJob = async(req,res)=>{
    try {
        const {title,description,requirements,location,companyId,salary,experience,jobType,position}=req.body;
        const userId=req.id;
        console.log(userId,"userId");
        console.log(req.body,"Body");
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({message:"Please fill all the fields.",success:false})
        }
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            location,
            companyId,
            salary:Number(salary),
            experience,
            jobType,
            position,
            company:companyId,
            create_by:userId
        });
        return res.status(200).json({message:"New Job created successfully.",success:true,job})
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query ={
            $or:[
                {title:{ $regex: keyword, $options: "i" } },
                {description:{ $regex: keyword, $options: "i" } },
            ]
        };
        const jobs=await Job.find(query);
        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}



// student
export const getJobById = async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"No job found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
        
    } catch (error) {
       console.log(error); 
    }
}

// Admin k leye

export const getAdminJobs = async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs=await Job.find({create_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
        
    } catch (error) {
      console.log(error);  
    }
}


