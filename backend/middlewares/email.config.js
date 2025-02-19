import nodelmailer from "nodemailer"

export const transport= nodelmailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"mohd936994@gmail.com",
        pass:'epcx dfur hdtu eomw'
    }
})