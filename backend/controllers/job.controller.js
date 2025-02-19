import {Job} from "../models/job.model.js"
export const postJob=async(req,res)=>{
    try {
        const {tittle,description,requirements,salary ,location,jobType,experience,positions,companyId}=req.body
       
        
        const userId=req.id

        if (!tittle||!description||!requirements||!salary ||!location||!jobType||!experience||!positions||!companyId) {
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }
        const job=await Job.create({
            tittle,
            description,
            requirements:requirements.split(","),
            salary:Number(salary) ,
            location,
            jobType,
            experienceLevel:experience,
            positions,
            company:companyId,
            createdBy:userId
        })
        return res.status(201).json({
            message:"new job created",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const getAllJobs=async(req,res)=>{
    try {
        const keyword=req.query.keyword||""
        const query={
            $or:[
                {tittle:{$regex:keyword,$options:"i"}},
                {discription:{$regex:keyword,$options:"i"}}
            ]
        }
        const job=await Job.find(query).populate({
            path:"company",

        }).sort({createdAt:-1})
        if (!job) {
            return res.status(400).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"job found successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const getJobId=async(req,res)=>{
    try {
        const jobId=req.params.id
        const job=await Job.findById(jobId).populate({
            path:"application"
        })
        if (!job) {
            return res.status(400).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"job found successfully",
            job,
            success:false
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const adminJob=async(req,res)=>{
    try {
        const adminId=req.id
        const jobs=await Job.find({createdBy:adminId}).populate({
            path:"company"
        })
        if (!jobs) {
            return res.status(400).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"jobs found",
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}