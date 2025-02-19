import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { adminJob, getAllJobs, getJobId, postJob } from "../controllers/job.controller.js"

const router=express.Router()

router.route('/post').post(isAuthenticated,postJob)
router.route('/get').get(isAuthenticated,getAllJobs)
router.route('/get/:id').get(isAuthenticated,getJobId)
router.route('/getadminjob').get(isAuthenticated,adminJob)


export default router