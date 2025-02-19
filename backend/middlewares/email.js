import { transport } from "./email.config.js"

export const sendVerificationCode=async(email,verificationCode)=>{
    try {
        const response=await transport.sendMail({
            from: '"fahad ansari" <mohd936994@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "verify you email ✔", // Subject line
            text: "verify email", // plain text body
            html: verificationCode, // html body
        })
        console.log("semail send successfullly");
        
    } catch (error) {
        console.log("send email error" ,error.message)
    }
}