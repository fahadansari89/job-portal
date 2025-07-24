import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authslice'
import { toast } from 'sonner'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = async () => {
        axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            .then((result) => {
                if (result.data.success) {
                    dispatch(setUser(null))
                    navigate('/login')
                    toast.success(result.data.message)


                }
            }).catch((err) => {
                toast.error(err.data.message)
            });
    }
    const { user } = useSelector(store => store.auth)
    return (
        <div className='w-full flex justify-between shadow-sm border-b '>
            <div className='flex justify-between items-center mx-auto px-4 w-full py-3'>
                <h1 className='text-xl font-bold sm:text-2xl mt-3'>Job <span className='text-indigo-600'>looker</span></h1>
            </div>
            <div className=' sm:flex items-center gap-8 flex align-middle'>

                <ul className='flex gap-5 font-medium'>
                    {
                        user && user.role === "Recruiter" ? (
                            <>
                                <li className='cursor-pointer'> <Link to='/admin/companies'>Companies</Link></li>
                                <li className='cursor-pointer'> <Link to='/admin/jobs'>Jobs</Link></li>
                            </>
                        ) : (<>
                            <li className='cursor-pointer'> <Link to='/'>Home</Link></li>
                            <li className='cursor-pointer'> <Link to='/jobs'>Jobs</Link></li>
                            <li className='cursor-pointer'> <Link to='/browse'>Browse</Link></li>

                        </>)
                    }


                </ul>

                {
                    !user ? (
                        <div className='flex gap-2'>
                            <Link to='/login'><Button variant='outline' className='text-black bg-indigo-600 border-none'>Login</Button></Link>
                            <Link to='/signup'><Button >Signup</Button></Link>
                        </div>
                    ) : (<Popover>
                        <PopoverTrigger>
                            <Avatar className='cursor-pointer'>
                                <AvatarImage src={user?.profile?.profilePhoto} />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className='flex gap-4 items-center '>

                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                </Avatar>
                                <div>
                                    <h3 className='font-medium'>{user?.fullName}</h3>
                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                </div>
                            </div>
                            <div className='grid grid-rows-2 place-items-start '>
                                {
                                    user&&user.role==="Student"&&( <div className='flex items-center'>
                                        <User2 />
                                        <Button variant='link'><Link to='/profile'>view profile</Link></Button>
                                    </div>)
                                }
                               
                                <div className='flex items-center'>
                                    <LogOut />
                                    <Button onClick={logoutHandler} variant='link'>logout</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>)
                }





            </div>
        </div>
    )
}

export default Navbar