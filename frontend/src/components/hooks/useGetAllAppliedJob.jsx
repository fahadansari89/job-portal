import { setAllAppliedJob } from '@/redux/jobslice'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAppliedJob = () => {
    const dispatch=useDispatch()
    useEffect(() => {
      const fetchAppliedjob= async()=>{
        try {
            
            const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true})
            console.log(res);
            
            if (res.data.success) {
                dispatch(setAllAppliedJob(res.data.application))
                
            }
        } catch (error) {
            console.log(error);
            
        }
      }
      fetchAppliedjob()
    }, [])
    

}

export default useGetAllAppliedJob