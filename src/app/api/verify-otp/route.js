import { connectDB } from "../../../../lib/db";
import { validateOtp } from "../../../../lib/otpStore";
import Users from "../../../../models/Users";

export async function POST(req){
    connectDB();
    const {name, email, password, otp} = await req.json();
    let validateResult = validateOtp(email, otp);
    if(validateResult.status == 200){
        console.log("OTP MATCHED");
        if(name){
            const isAlreadyRegistered = await Users.findOne({email});
            if(isAlreadyRegistered){
                return new Response(JSON.stringify({success: false, message: "Email Already Registered."}),{
                    status: 409,
                })
            }
            const isRegistered = registerUser(name, email, password);
            if(!isRegistered){
                return new Response(JSON.stringify({success: false, message: "Failed to create a new user."}),{
                    status: 400,
                })
            }else{
                return new Response(JSON.stringify({success: true, message: "Signup Succesfull"}),{
                    status: 201,
                })
            }
        }
    }
    return Response.json(validateResult);
}

const registerUser = async (name, email, password)=>{
    const newUser = await Users.create({
        name: name,
        email: email,
        password: password 
    })

    if(!newUser || !newUser._id){
        return false;
    }

    return true;

}