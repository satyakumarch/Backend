import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation=async(req,res,next)=>{
    const {firstName,lastName,date,time,email,phone }=req.body;
    if(!firstName || !lastName || !date || !time || !email || !phone){
        return next(new ErrorHandler("Please fill full reservation form!",400));
    }
    console.log(req.body);
    try{
        await Reservation.create({firstName,lastName,date,time,email,phone});
        res.status(201).
        json({
            success:true,
            message:"reservation sent sucessfully",
        });
       
        
    }catch(error){
      
        if(error.name=="ValidationError"){
            const ValidationError=Object.values(error.errors).map
                (err=>err.message);
            
            return next(new ErrorHandler(ValidationError.join(" , "),400));
        }
        return next(error);
    
    }
};
export default sendReservation;