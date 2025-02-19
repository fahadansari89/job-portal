import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authslice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'


const Updateprofiledialog = ({open,setopen}) => {
    const [loading, setloading] = useState(false)
    const {user} =useSelector(store=>store.auth)

    const dispatch=useDispatch()
    const [input, setinput] = useState({
        fullName:user?.fullName,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.profile?.resume
    })
    const changeEventHandlr=(e)=>{
        setinput({...input,[e.target.name]:e.target.value})
    }
    const submitHandle=(e)=>{
        e.preventDefault()
        const formdata=new FormData();
        formdata.append("fullName",input.fullName)
        formdata.append("email",input.email)
        formdata.append("phoneNumber",input.phoneNumber)
        formdata.append("bio",input.bio)
        formdata.append("skills",input.skills)
        if (input.file) {
            
            formdata.append("file",input.file)
        }
        console.log(input);
        setloading(true)

        axios.post(`${USER_API_END_POINT}/profile/update`,formdata,{
           headers:{
            "Content-Type":"multipart/form-data"

           },
           withCredentials:true 
           
        }).then((result) => {
            if (result.data.success) {
                dispatch(setUser(result.data.user))
                toast.success(result.data.message)
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err.data.message)
            
        }).finally(()=>{
            setloading(false)
        })
        setopen(false)
        console.log(input);
        
    }
    const fileHandler=(e)=>{
       const file=e.target.files?.[0]
       setinput({...input,file})
    }
  return (
    <div className=''>
        <Dialog open={open}>
         <DialogContent className='bg-black' onInteractOutside={()=>setopen(false)}>

            <DialogHeader>
                <DialogTitle className=''>Update profile</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandle}>
            <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right ">Name</Label>
                                <Input
                                    id="name"
                                    name="fullName"
                                    type="text"
                                    value={input.fullName}
                                    onChange={changeEventHandlr}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right ">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandlr}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right ">Number</Label>
                                <Input
                                    id="number"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandlr}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right ">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandlr}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right ">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandlr}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right ">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileHandler}
                                    
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button  className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-indigo-600 hover:bg-indigo-800">Update</Button>
                            }
                        </DialogFooter>
            </form>
         </DialogContent>
        </Dialog>
    </div>
  )
}

export default Updateprofiledialog