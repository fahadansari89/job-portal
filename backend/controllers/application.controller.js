import {Application} from "../models/application.model.js"
import { Job } from "../models/job.model.js"
export const applyJob=async(req,res)=>{
    try {
        const userId=req.id
        const jobId=req.params.id
        if (!jobId) {
            return res.status(400).json({
                message:"job id is required",
                sucsess:false
            })
        }
        const existingApplication=await Application.findOne({job:jobId,applicant:userId})
        if (existingApplication) {
            return res.status(400).json({
                message:"already applied",
                success:false
            })
        }
        const job=await Job.findById(jobId)
        if (!job) {
            return res.status(400).json({
                message:"job not found",
                success:false
            })
        }
        const newApplication=await Application.create({
            job:jobId,
            applicant:userId 
        })
        job.application.push(newApplication._id)
        await job.save()
        return res.status(200).json({
            message:"applied successfully",
            success:true
        })
    } catch (error) {
        console.log("apply job error",error.message);
        
    }
}
export const getAppliedJob =async(req,res)=>{
    try {
        const userId=req.id
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        })
        if (!application) {
            return res.status(400).json({
                message:"you have not applied ",
                sucsess:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })  
    } catch (error) {
        console.log(error);
        
    }
}
export const getApplicant=async(req,res)=>{
    try {
        const jobId=req.params.id
        const job=await Job.findById(jobId).populate({
            path:"application",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        })
        if (!job) {
            return res.status(400).json({
                message:"job not found ",
                sucsess:false
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
export const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body
        const applicationId=req.params.id
        if (!status) {
            return res.status(400).json({
                message:"status not found ",
                success:false
            })
        }
        const application =await Application.findOne({_id:applicationId})
        if (!application) {
            return res.status(400).json({
                message:"application not found ",
                success:false
            })
        }
        application.status=status.toLowerCase();
        await application.save()

        return res.status(200).json({
            message:"status update successfully ",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}