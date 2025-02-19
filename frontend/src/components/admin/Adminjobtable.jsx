import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { all } from 'axios'

const Adminjobtable = () => {
    const navigate=useNavigate()
    const { companies=[] ,searchCompanyByText } = useSelector(store => store.company)
    const {allAdminJobs=[],searchJobByText}=useSelector(store=>store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
   
useEffect(() => {
     const filteredCompany=allAdminJobs.length>=0&&allAdminJobs.filter((job)=>{
        if(!searchJobByText){
            return true
        }
        return job?.tittle?.toLowerCase().includes(searchJobByText.toLowerCase())||job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
     })
     setFilterJobs(filteredCompany)
}, [allAdminJobs,searchJobByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    


                            {
                                filterJobs?.map((job) => (
                                    
                                        <tr>
                                            
                                            <TableCell >{job?.company?.name}</TableCell>
                                            <TableCell >{job?.tittle}</TableCell>
                                            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>

                                            <TableCell className='text-right cursor-pointer'>
                                                <Popover>
                                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                    <PopoverContent className='w-28'>
                                                        <div onClick={()=>navigate(`/admin/create/${job._id}`)} className='flex items-center gap-5'>
                                                            <Edit2 name='edit' size={15} className='cursor-pointer'/><span name='edit' className='cursor-pointer'>Edit</span>
                                                        </div>
                                                        <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-16 gap-2 cursor-pointer mt-2'>
                                                            <Eye/>
                                                            <span className='text-sm'>Applicants</span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>

                                        </tr>
                                    )
                                )
                            }

                        
                    

                </TableBody>
            </Table>
        </div>
    )
}

export default Adminjobtable