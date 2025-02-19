
import { setAllAdminJobs } from '@/redux/jobslice'
import {  JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJob = () => {
    const dispatch=useDispatch()
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjob`,{withCredentials:true});
      
        
        if(res.data.success){
            dispatch(setAllAdminJobs(res.data.jobs));
        }
    } catch (error) {
        console.log(error);
    }


    }
    fetchCompanies()
  }, [])
  
}

export default useGetAllAdminJob