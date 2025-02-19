import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from '../ui/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader2, Phone } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';

import { setLoading, setUser } from '@/redux/authslice';

const signupSchema=Yup.object({
    email:Yup.string().email().required("email is required"),
    password:Yup.string().min(6).required("password is required"), 
     
})
const initialValues={
   
   email:'',
  
   password:'',
   role:'',
  
}
const Signup = () => {
    const {loading}=useSelector(store=>store.auth)
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
  
   const {values,errors,handleBlur,handleChange,handleSubmit,touched}= useFormik({
        initialValues:initialValues,
        validationSchema:signupSchema,
        onSubmit:(values)=>{
          
          
            console.log(values);
            // try {
            //   const response=axios.post(`${USER_API_END_POINT}/login`,values,{
            //       headers:{
            //           "content-Type":"application/json"
            //       },
            //       withCredentials:true
            //   })
            //   console.log(response.data.message);
              
            //   if (response.data.success) {
            //       toast.success(res)
            //       navigate('/')
            //   }
            // } catch (error) {
            //   toast.error(error)
              
            // }
            dispatch(setLoading(true))
            axios.post(`${USER_API_END_POINT}/login`,values,{
              headers:{
                  "content-Type":"application/json"
              },
              withCredentials:true
          }).then((result) => {
              if (result.data.success) {
                  dispatch(setUser(result.data.user))
                  toast.success(result.data.message)

                  navigate("/")
              }
              
          }).catch((err) => {
              console.log(err);
              toast.error(err.response.data.message)
              
              
          }).finally(() => {
                         dispatch(setLoading(false)) 
                  })
            
            
        }

    })
    
    
    const [show, setshow] = useState(false)
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center max-w-6xl mx-auto'>
            <form onSubmit={handleSubmit}className='w-1/2 border-2 border-gray-200 rounded-md p-4 my-10 shadow-white shadow-md'>
                <h1 className='font-bold text-3xl mb-5 text-center text-indigo-600'>LOGIN</h1>
               
                <div>

                 <Label> Email</Label>
                 <Input
                 type='email'
                 placeholder='enter your email'
                 name="email"
                 values={values.email}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 
                 />
                  {
                    errors.email&&touched.email? <p className='text-red-600 text-sm'>{errors.email}</p>:null
                 }
                </div>
                
                <div>

                 <Label>password</Label>
                 <Input
                 type={show ?'text':'password'}
                 placeholder='enter your password'
                 name="password"
                 values={values.password}
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
                <div className='flex items-center gap-4 space-x-2'>
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
                    

                    <div>
                    {
                    loading ? <Button className='w-full mt-4 bg-slate-600' type='submit'><Loader2 className='mr-2 h-4 w-4 animate-spin'/> please wait</Button>:<Button className='w-full mt-4 bg-indigo-600 hover:bg-indigo-700' type='submit'>Submit</Button>}
                    </div>

                    <div className='mt-4'>
                        <p className=''>Dont't have an account? <Link to={'/signup'} className='text-blue-600'>singup here</Link></p>
                    </div>
               
            </form>
        </div>
    </div>
  )
}

export default Signup