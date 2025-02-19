import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { setSingleJob } from '@/redux/jobslice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'

const Jobdescription = () => {
    const dispatch = useDispatch()
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    
    const isInitialyyApplied = singleJob?.application?.some(application => application.applicant === user?._id)||false
    const [isApplied, setisApplied] = useState(isInitialyyApplied)
    const params = useParams()
    const jobId = params.id
    const applyHandler=async()=>{
        await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true}).then((result) => {
            console.log(result.data);
            
            if(result.data.success){
                setisApplied(true)//update the state]
                const updatedJob={...singleJob,application:[...singleJob.application,{applicant :user?._id}]}
                dispatch(setSingleJob(updatedJob))//update the applied button
                toast.success(result.data.message)
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
        });
    }

    useEffect(() => {
      const fetchJob = async () => {
       await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true}).then((result) => {
            dispatch(setSingleJob(result.data.job))

            setisApplied(result.data.job.application.some((application) => application.applicant === user?._id))

        }).catch((err) => {
            console.log(err);
            
        });
      }
        fetchJob()
    }, [jobId, dispatch, user?.id])
    
    
    return (
        <div className='max-w-5xl mx-auto my-10'>
            <div className='flex items-center justify-between'>

                <div>

                    <h1 className='font-bold text-xl'>{singleJob?.tittle}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.positions} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                 onClick={isApplied?null:applyHandler}
                 disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-300 cursor-not-allowed' : "bg-indigo-600 hover:bg-indigo-700"}`}>{isApplied ? "Already applied" : 'Apply now'}</Button>

            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.tittle}</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-300'>{singleJob?.tittle}</span></h1>
                <h1 className='font-bold my-1'>Location:  <span className='pl-4 font-normal text-gray-300'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-300'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-300'>{singleJob?.experienceLevel} year</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-300'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-300'>{singleJob?.application?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-300'>today</span></h1>
            </div>
        </div>
    )
}

export default Jobdescription