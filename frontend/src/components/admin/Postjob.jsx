import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'


const companyArray=[]
const Postjob = () => {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    tittle: "",
    description: "",
    requirements: "",
    salary: "",
    jobType: "",
    experience: "",
    positions: "",
    location:"",
    companyId:""
    
  })
  const {companies}=useSelector(store=>store.company)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const selectChangeHandler=(value)=>{
     const selectedCompany=companies.find((company)=>company.name.toLowerCase()===value)
     setInput({...input, companyId:selectedCompany._id})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(input);
    try {
      setLoading(true)
      const res=await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      console.log(error);
      
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
    
  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center w-screen my-5'>
          <form onSubmit={handleSubmit} action=""className='p-8 max-w-4xl border border-gray-200 shadow-md shadow-white'>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <Label>
              Tittle
            </Label>
            <Input
              type='text'
              name='tittle'
              value={input.tittle}
              onChange={changeEventHandler}
              className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
            />
          </div>
          <div>
            <Label>
              description
            </Label>
            <Input
              type='text'
              name='description'
              value={input.description}
              onChange={changeEventHandler}
              className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
            />
          </div>
          <div>
            <Label>
              requirements
            </Label>
            <Input
              type='text'
              name='requirements'
              value={input.requirements}
              onChange={changeEventHandler}
              className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
            />
          </div>
          <div>
            <Label>
              salary
            </Label>
            <Input
              type='text'
              name='salary'
              value={input.salary}
              onChange={changeEventHandler}
              className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
            />
          </div>
          <div>
            <Label>
              jobtype
            </Label>
            <Input
              type='text'
              name='jobType'
              value={input.jobType}
              onChange={changeEventHandler}
              className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
            />
          </div>
          <div>
            <Label>
              experience
            </Label>
            <Input
              type='number'
              name='experience'
              value={input.experience}
              onChange={changeEventHandler}
              className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
            />
          </div>
          <div>
            <Label>
              positions
            </Label>
            <Input
              type='number'
              name='positions'
              value={input.positions}
              onChange={changeEventHandler}
              className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
            />
          </div>
          <div>
            <Label>
              location
            </Label>
            <Input
              type='text'
              name='location'
              value={input.location}
              onChange={changeEventHandler}
              className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
            />
          </div>
          {
            companies.length>0&&(<Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    companies.map((company)=>{
                      return  <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                    })
                  }
                  
                 
                 
                </SelectGroup>
              </SelectContent>
            </Select>)
          }
        </div>
        {
           
            loading ? <Button className='w-full mt-4 bg-indigo-600 hover:bg-indigo-700' type='submit'><Loader2 className='mr-2 h-4 w-4 animate-spin'/> please wait</Button>: <Button type='submit' className='bg-indigo-600 hover:bg-indigo-700 w-full mt-3'>Submit</Button>
        }
       
        {
          companies.length===0&&<p className='text-xs text-red-600 font-bold text-center mt-2'>please register a company first before postion job</p>
        }
          </form>


      </div>
    </div>
  )
}

export default Postjob