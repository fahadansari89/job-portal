import mongoose from "mongoose";

const dbConnection=async()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((result) => {
        console.log("database connected successfully");
        
    }).catch((err) => {
        console.log("mongoose error",err.message);
        
    });
}
export default dbConnection