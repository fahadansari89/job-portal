import React from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Jobdescription from './components/Jobdescription'
import Profile from './components/Profile'
import Companies from './components/admin/Companies'
import Companycreate from './components/admin/Companycreate'
import CompanySetup from './components/admin/CompanySetup'
import Adminjobs from './components/admin/Adminjobs'
import Postjob from './components/admin/Postjob'
import Applicants from './components/admin/Applicants'
import Verification from './components/auth/Verification'


const App = () => {
  const appRouter=createBrowserRouter([
    {
    path:'/',
    element:<Home/>

  },
    {
    path:'/login',
    element:<Login/>

  },
    {
    path:'/signup',
    element:<Signup/>

  },
    {
    path:'/verification',
    element:<Verification/>

  },
    {
    path:'/jobs',
    element:<Jobs/>

  },
    {
    path:'/browse',
    element:<Browse/>

  },
    {
    path:'/profile',
    element:<Profile/>

  },
    {
    path:'/description/:id',
    element:<Jobdescription/>

  },
  //admin router starts
  {
    path:'/admin/companies',
    element:<Companies/>
  },
  {
    path:'/admin/companies/create',
    element:<Companycreate/>
  },
  {
    path:'/admin/companies/:id',
    element:<CompanySetup/>
  },
  {
    path:'/admin/jobs',
    element:<Adminjobs/>
  },
  {
    path:'/admin/jobs/create',
    element:<Postjob/>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<Applicants/>
  },
])
  return (
    <div>
     <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App