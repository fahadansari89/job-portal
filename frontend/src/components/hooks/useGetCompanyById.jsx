import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs, setSingleJob, } from '@/redux/jobslice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT, USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetCompanyById = (companyId) => {
    const dispatch=useDispatch()
  useEffect(() => {
    const fetchSingleCompany = async () => {
        await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true})
        .then((result) => {
          
            if (result.data.success) {
                    dispatch(setSingleCompany(result.data.company))
                    console.log('clas');

                    
                   
                }
                
        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
            
        });

    }
    fetchSingleCompany()
  }, [])
  
}

export default useGetCompanyById