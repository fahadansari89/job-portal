import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Companiestable from './Companiestable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  const [input, setInput] = useState("")
  const dispatch=useDispatch()
  useGetAllCompanies() 
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])
  
  return (
    <div>
        <Navbar/>

        <div className=' max-w-5xl mx-auto my-10'>
          <div className='flex items-center justify-between'>

          <Input
          className='w-fit'
          placeholder='filter by name'
          onChange={(e)=>setInput(e.target.value)}
          />
          <Button className='bg-indigo-600 hover:bg-indigo-800' onClick={()=>navigate('/admin/companies/create')}>New company</Button>
          </div>
          <Companiestable/>

        </div>
    </div>
  )
}

export default Companies