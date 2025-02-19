import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'

const Applicantstable = () => {
    const shortlisting = ["accepted", "rejected"]
    const { applicants } = useSelector(store => store.application)
    const statusHandler= async(status,id)=>{
        console.log("called");
        
       try {
        axios.defaults.withCredentials=true
        const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},)
        if (res.data.success) {
            toast.success(res.data.message)
            console.log(res);
            
        }
       } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        
       }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead> name</TableHead>
                        <TableHead>email</TableHead>
                        <TableHead>contact</TableHead>
                        <TableHead>resume</TableHead>
                        <TableHead>date</TableHead>
                        <TableHead className='text-right'>action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.application?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullName}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className='text-blue-600'><a href={item?.applicant?.profile?.resume} target='_blank'> {item?.applicant?.profile?.resumeOrginalName}</a></TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {shortlisting.map((status, index) => {
                                                return <div className='cursor-pointer' onClick={()=>statusHandler(status,item?._id)} key={index}>
                                                    <span>{status}</span>
                                                </div>
                                            })}
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>

            </Table>

        </div>
    )
}

export default Applicantstable