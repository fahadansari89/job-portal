import { setAllJobs, setSingleJob, } from '@/redux/jobslice'
import { JOB_API_END_POINT, USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetalljobs = () => {
    const dispatch=useDispatch()
    const {searchQuery}=useSelector(store=>store.job)
  useEffect(() => {
    const fetchAllJobs = async () => {
        axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`,{withCredentials:true})
        .then((result) => {
            if (result.data.success) {
                    dispatch(setAllJobs(result.data.job))
                   
                }
                
        }).catch((err) => {
            console.log(err);
            
        });

    }
    fetchAllJobs()
  }, [])
  
}

export default useGetalljobs