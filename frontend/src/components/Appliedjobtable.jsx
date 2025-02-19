import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'


const Appliedjobtable = () => {
    const {allAppliedJobs}=useSelector(store=>store.job)
  return (
    <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                       allAppliedJobs.length<=0?<span>you haven't applied any job</span> : allAppliedJobs.map((appliedjob)=>{
                          return <TableRow key={appliedjob._id}>
                             <TableCell>{appliedjob.createdAt.split("T")[0]}</TableCell>
                             <TableCell>{appliedjob.job?.tittle}</TableCell>
                             <TableCell>{appliedjob.job?.company?.name}</TableCell>
                             <TableCell className='text-right'><Badge className={`${appliedjob?.status==="rejected"?'bg-red-500':appliedjob.status==="pending"?'bg-slate-500':"bg-green-500"} bg-indigo-600`}>{appliedjob.status.toUpperCase()}</Badge></TableCell>
                          </TableRow>
                       })
                    }
                </TableBody>
            </Table>
        </div>
  )
}

export default Appliedjobtable