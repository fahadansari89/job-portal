import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import dbConnection from "./utils/db.js"
import userRoute from "./routes/user.router.js"
import companyRoute from './routes/company.router.js'
import jobRoute from './routes/job.router.js'
import applicantRoute from './routes/application.route.js'

dotenv.config()
const app=express()

const port=4000||process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOption))
app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/job',jobRoute)
app.use('/api/v1/application',applicantRoute)
app.listen(port,()=>{
    dbConnection()
    console.log(`server started at ${port}`);
    
})