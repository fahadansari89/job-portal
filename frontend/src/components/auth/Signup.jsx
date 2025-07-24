import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from '../ui/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant.js';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authslice';
import store from '@/redux/store';
import { Loader2 } from 'lucide-react';

const signupSchema=Yup.object({
    fullName:Yup.string().min(3).required('full name is required'),
    email:Yup.string().email().required("email is required"),
    phoneNumber:Yup.number().required("phone is required"),
    password:Yup.string().min(6).required("password is required"), 
    role: Yup.string().required("Role is required")
     
})
const initialValues={
   fullName:'',
   email:'',
   phoneNumber:'',
   password:'',
   role:'',
   file:null
}
const Signup = () => {
    const {loading}=useSelector(store=>store.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()
   const {values,errors,handleBlur,handleChange,handleSubmit,touched,setFieldValue}= useFormik({
        initialValues:initialValues,
        validationSchema:signupSchema,
        onSubmit:(values)=>{
            console.log(values);
            const formData=new FormData()
              formData.append("fullName",values.fullName)
              formData.append("email",values.email)
              formData.append("phoneNumber",values.phoneNumber)
              formData.append("password",values.password)
              formData.append("role",values.role)
              if (values.file) {
                
                  formData.append("file",values.file)
              }

            //   try {
            //     const response=axios.post(`${USER_API_END_POINT}/register`,values,formData,{
            //         headers:{
            //             "content-Type":"multipart/form-data"
            //         },
            //         withCredentials:true
            //     })
            //     if (response.data.success){
            //         toast.success(response.data.message)
            //         navigate("/login")
            //     }
            //   } catch (error) {
            //     console.log("api error",error);
            //     toast.error(error.data.message)
                
            //   }
            dispatch(setLoading(true))
            
            axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "content-Type":"multipart/form-data"
                },
                withCredentials:true
                
            }).then((result) => {
                
                if (result.data.success) {
                    toast.success(result.data.message)
                    navigate("/verification")
                }
                 
            }).catch((err) => {
                
                toast.error(err.response.data.message)
                console.log(err);
                
                
            }).finally(() => {
               dispatch(setLoading(false)) 
        })
            
        }

    })
    
    
    const [show, setshow] = useState(false)
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center min-h-screen w-full mx-auto p-4'>
            <form onSubmit={handleSubmit}className='w-full sm:w-[90%] md:w-1/2 border-2 border-gray-200 rounded-md p-4 my-10 shadow-white shadow-md'>
                <h1 className='font-bold text-2xl sm:text-3xl mb-5 text-center text-indigo-600'>SIGNUP</h1>
                <div>

                 <Label> Full name</Label>
                 <Input
                 type='text'
                 placeholder='enter your name'
                 name='fullName'
                 value={values.fullName}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 
                 />
                 {
                   errors.fullName&&touched.fullName? <p className='text-red-600 text-sm'>{errors.fullName}</p>:null
                 }
                </div>
                <div>

                 <Label> Email</Label>
                 <Input
                 type='email'
                 placeholder='enter your email'
                 name="email"
                 value={values.email}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 
                 />
                  {
                    errors.email&&touched.email? <p className='text-red-600 text-sm'>{errors.email}</p>:null
                 }
                </div>
                <div>

                 <Label>Phone</Label>
                 <Input
                 type='number'
                 placeholder='enter your number'
                 name='phoneNumber'
                 value={values.phoneNumber}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 />
                  {
                   errors.phone&&touched.phone? <p className='text-red-600 text-sm'>{errors.phone}</p>:null
                 }
                </div>
                <div> 

                 <Label>password</Label>
                 <Input
                 type={show ?'text':'password'}
                 placeholder='enter your password'
                 name="password"
                 value={values.password}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 
                 />
                  {
                    errors.password&&touched.password?<p className='text-red-600 text-sm'>{errors.password}</p>:null
                 }
                 <div className='place-items-end relative bottom-8 right-5'>
                   {
                    show ? <FaEyeSlash size={25} onClick={()=>setshow(show=>!show)} className='cursor-pointer' />: <FaEye size={25} onClick={()=>setshow(show=>!show)} className='cursor-pointer'/>
                   }
                
                 </div>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center gap-4 space-x-2'>
                    <div className='flex items-start gap-2'>
                        <Label htmlFor='student' className='cursor-pointer'>Student</Label>
                        <input
                        className='cursor-pointer'
                        id='student'
                        type="radio" 
                        name='role' 
                        value='Student'
                        checked={values.role==='Student'}   
                        onChange={handleChange}
                        onBlur={handleBlur}    
                        /> 
                    
                    </div>
                   

                    <div className='flex items-center gap-2'>
                        <Label htmlFor='rec' className='cursor-pointer'>Recruiter</Label>
                        <input
                        className='cursor-pointer'
                        id='rec'
                        type="radio" 
                        name='role' 
                        
                        value='Recruiter'
                        checked={values.role==='Recruiter'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        
                    </div>
                </div>
                    <div className='flex align-middle mt-5 items-center gap-3'>
                        <Label className='text-'>profile</Label>
                        <Input
                        accept='image/*'
                        type='file'
                        
                        className='cursor-pointer '
                        onChange={(e)=>{setFieldValue('file',e.currentTarget.files[0])}}
                        />
                    </div>

                    <div>
                        {loading?<Button className='w-full mt-4 bg-slate-600' type='submit'><Loader2 className='mr-2 h-4 w-4 animate-spin'/> please wait</Button>:<Button className='w-full mt-4 bg-indigo-600 hover:bg-indigo-700' type='submit'>Submit</Button>}
                        
                    </div>  

                    <div className='mt-4'>
                        <p className=''>have an account? <Link to={'/login'} className='text-blue-600'>Login here</Link></p>
                    </div>
               
            </form>
        </div>
    </div>
  )
}

export default Signup