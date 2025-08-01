import { Bookmark } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate=useNavigate()
    const daysAgoFunction = (mongodbTime) => {
        const createdAt=new Date(mongodbTime)
        const currentDate=new Date() 
        const timeDifference=currentDate-createdAt
        return Math.floor(timeDifference/(1000*60*60*24))
    }
  return (
    <div className='p-4 sm:p-5 w-full max-w-xl rounded-md shadow-xl bg-slate-800 border border-gray-600'>
            <div className='flex items-center justify-between'>
                <p className='text-xs sm:text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)===0?"Today":`${daysAgoFunction(job?.createdAt)}`} days ago</p>
                <Button variant="outline" className="rounded-full bg-slate-800" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex flex-col sm:flex-row sm:items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.tittle}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className={'text-violet-500 font-bold'} variant="ghost">{job?.positions} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-indigo-500 font-bold'} variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className='flex flex-col sm:flex-row items-stretch sm:items-cente gap-4 mt-4'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)} className='bg-slate-800' variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
  )
}

export default Job