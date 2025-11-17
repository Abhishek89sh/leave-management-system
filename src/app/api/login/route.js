import { decryptData } from "../../../../functions/protectData";
import { connectDB } from "../../../../lib/db";
import Users from "../../../../models/Users";

export async function POST(req){
    const {email, password} = await req.json();
    if(!email || !password) return new Response(JSON.stringify({isSuccess: false, message: "Invalid Request Body"}), {status: 400});
    const ADMIN_ID = process.env.ADMIN_ID;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    if(email.trim() === ADMIN_ID){
        if(password === ADMIN_PASS){
            return new Response(JSON.stringify({isSuccess: false, message: "Email Not Registered"}), {status: 404});
        }
        return new Response(JSON.stringify({isSuccess: true, data: {id: ADMIN_ID, role: "admin"}}), {status: 200});
    }
    await connectDB();
    const data = await Users.findOne({email}).select("_id password role");
    if(!data) return new Response(JSON.stringify({isSuccess: false, message: "Email Not Registered"}), {status: 404});
    const userDecodedPass = decryptData(password);
    const actualDecodedPass = decryptData(data.password);
    if(userDecodedPass === actualDecodedPass){
        return new Response(JSON.stringify({isSuccess: true, data: {id: data._id, role: data.role}}), {status: 200});
    }else{
        return new Response(JSON.stringify({isSuccess: false, message: "Wrong Password"}), {status: 401});
    }
}