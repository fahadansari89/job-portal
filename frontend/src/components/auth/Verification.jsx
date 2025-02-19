import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useFormik } from 'formik'

const Verification = () => {
  const initialValue = {
    verificationCode: ""
  }
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: initialValue,
    onSubmit: async (values) => {
      try {
        setloading(true)
        const res = await axios.post(`${USER_API_END_POINT}/verify`, values, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        if (res.data.success) {
          toast.success(res.data.message)
          navigate('/login')
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      } finally {
        setloading(false)
      }

    }
  })

  return (
    <div>

      <Navbar />
      <div className='flex justify-center'>
        <div className='w-1/3 my-16'>



          <Label className='text-xl font-thin'> Enter your verification code which is sent your registered email</Label>
          <div className=' '>
            <form onSubmit={handleSubmit}>

              <Input
                type='text'
                name='verificationCode'
                value={values.verificationCode}
                className='flex justify-center mt-10 text-center'
                placeholder="enter your code"
                onChange={handleChange}

              />

              {loading ? <Button className='w-full mt-4 bg-slate-6000 te' type='submit'><Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait</Button> : <Button className='bg-indigo-500 w-full mt-5 hover:bg-indigo-700' type='submit'>verify</Button>
              }

            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Verification