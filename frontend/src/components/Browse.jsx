import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux';
import { all } from 'axios';
import { setSearchQuery } from '@/redux/jobslice';
import useGetalljobs from './hooks/useGetalljobs';

const Browse = () => {
    const randomJobs = [1, 2,45];
    useGetalljobs()
    const {allJobs}=useSelector(store=>store.job)
    const dispatch=useDispatch()
    useEffect(() => {
      return()=>{
        dispatch(setSearchQuery(""))
      }
    }, [])
    
  return (
    <div>
       
        <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results :{allJobs.length}</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </div>
    </div>
  )
}

export default Browse