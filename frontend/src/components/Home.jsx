import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Herosection from './Herosection'
import Categorycarousel from './Categorycarousel'
import Latestjob from './Latestjob'
import Footer from './Footer'
import useGetalljobs from './hooks/useGetalljobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetalljobs()
  const navigate=useNavigate()
  const {user}=useSelector(store=>store.auth)
  useEffect(() => {
    if (user?.role==="Recruiter") {
      navigate('/admin/companies')
    }
  }, [])
  
  return (
    <div>
        <Navbar/>
        <Herosection/>
        <Categorycarousel/>
        <Latestjob/>
        <Footer/>
        
    </div>
  )
}

export default Home