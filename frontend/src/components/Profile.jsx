import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import Appliedjobtable from './Appliedjobtable'
import Updateprofiledialog from './Updateprofiledialog'
import { useSelector } from 'react-redux'
import useGetAllAppliedJob from './hooks/useGetAllAppliedJob'

const Profile = () => {
    // const skills=['HTML','CSS','javascript','java']
    const [open, setopen] = useState(false)
    const {user}=useSelector(store=>store.auth)
    useGetAllAppliedJob()
    const isresume=true
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto bg-slate-800 border-gray-800 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>

                    <div className='flex item-center align-middle gap-4'>

                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user?.profile?.profilePhoto} />
                        </Avatar>
                        <div>

                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={()=>{setopen(true)}} className='text-right'><Pen /></Button>
                </div>
                <div className=''>
                    <div className='flex gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>

                    </div>
                    <div className='flex  gap-3 my-2'>

                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>

                </div>
                <div>
                    <h1>skills</h1>
                    {
                     user?.profile?.skills.length!==0? user?.profile?.skills.map((itm,ind)=><Badge key={ind} className={'mx-1'}>{itm}</Badge>):<span>NA</span>
                    }
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5 mt-5'>
                         <Label className='text-sm font-bold'>Resume</Label>
                         {
                            isresume?<a className='text-blue-600' target='blank' href={user?.profile?.resume}>{user?.profile?.resumeOrginalName}</a>:<spna>NA</spna>
                         }
                </div>
            </div>
                <div className='max-w-6xl mx-auto bg-slate-900 rounded-2xl p-5'>
                    <h1 className='text-center text-3xl font-semibold '>Applied job</h1>
                    <Appliedjobtable/>
                </div>
               <Updateprofiledialog open={open} setopen={setopen}/>
        </div>
    )
}

export default Profile