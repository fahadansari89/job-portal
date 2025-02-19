import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationCode } from "../middlewares/email.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email,phoneNumber, password, role, file } = req.body;
    console.log(fullName, email, phoneNumber, password, role);
    
    if (!fullName || !email || !password || !role || !phoneNumber ||!file) {
      return res.status(400).json({
        message: "all field are required",
        success: false,
      });
    }
     file=req.file
    const fileUri=getDataUri(file)
    const cloudResponse= await cloudinary.uploader.upload(fileUri.content)
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode=Math.floor(Math.random()*100000).toString()
    await User.create({
      fullName,
      email,
      phoneNumber,
      verificationCode,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url
      }
    });
    sendVerificationCode(email,verificationCode)
    return res.status(200).json({
      message: "email send  successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
  
    
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "all field are required",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not exist",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password)
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "incorrect password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "incorrect role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user={
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }
    return res.status(200).cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
    }).json({
        message:`Welcome back ${user.fullName}`,
        user,
        success:true
    });
  } catch (error) {
    console.log(error);
  }
};
export const logout=async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxage:0}).json({
            message:"logout successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const updateProfile=async(req,res)=>{
    try {
      const { fullName, email,phoneNumber,bio, skills } = req.body; 
      console.log(fullName);
      
      const file=req.file
      const fileUri=getDataUri(file)
      const cloudResponse= await cloudinary.uploader.upload(fileUri.content)
      
      let skillsArray
      if (skills) {
        
           skillsArray=skills.split(",")
      }
      const userId=req.id//middleware authentication
       let user =await User.findById(userId)
       if (!user) {
        return res.status(400).json({
            message: "user not found",
            success: false,
          });
       }
       //updating data
       if (fullName) user.fullName=fullName
       if (email) user.email=email
       if (phoneNumber) user.phoneNumber=phoneNumber
       if (bio) user.profile.bio=bio
       if (skills) user.profile.skills=skillsArray
       if (cloudResponse) {
           user.profile.resume=cloudResponse.secure_url
           user.profile.resumeOrginalName=file.originalname
       }

       await user.save()
       user={
        id:user._id,
        fullName:user.fullName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
       }
       return res.status(200).json({
        message:"user update successfully",
        user,
        success:true
       })
    } catch (error) {
        console.log(error);
        
    }
}
export const verifyEmail=async(req,res)=>{
  try {
    
    const {verificationCode}=req.body
    if (!verificationCode) {
      return res.status(400).json({
        message:"please enter a code",
        success:false
      })
    }
    const user=await User.findOne({verificationCode})
    if (!user) {
      return res.status(400).json({
        message:"invalid code",
        success:false
      })
    }
    user.isVerified=true
    user.verificationCode=undefined
    await user.save()
    return res.status(200).json({
      message:"verified successfully",
      success:true
    })
  } catch (error) {
    console.log(error);
    
  }

}