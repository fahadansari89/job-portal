import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import Adminjobtable from './Adminjobtable'
import useGetAllAdminJob from '../hooks/useGetAllAdminJob'
import { setSearchJobByText } from '@/redux/jobslice'

const Adminjobs = () => {
  useGetAllAdminJob()
  const [input, setInput] = useState("")
  const dispatch=useDispatch()
   
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])
  
  return (
    <div>
        <Navbar/>

        <div className=' max-w-5xl mx-auto my-10'>
          <div className='flex items-center justify-between'>

          <Input
          className='w-fit'
          placeholder='filter by name, role'
          onChange={(e)=>setInput(e.target.value)}
          />
          <Button className='bg-indigo-600 hover:bg-indigo-800' onClick={()=>navigate('/admin/jobs/create')}>Post new job</Button>
          </div>
          <Adminjobtable/>

        </div>
    </div>
  )
}

export default Adminjobs