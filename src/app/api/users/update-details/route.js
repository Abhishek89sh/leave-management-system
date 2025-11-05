import { connectDB } from "../../../../../lib/db";
import Users from "../../../../../models/Users";

export async function POST(req){
    const {email, role, department, head} = await req.json();
    if(!email || !role || !department || !head){
        return new Response(JSON.stringify({isSuccess: false, message: "Details not found"}), {status: 401});
    }
    await connectDB();
    const result = await Users.updateOne(
        {email},
        {$set: {role: role, department: department, head: head, status: "pending"}}
    )
    if(result.modifiedCount === 1){
        return new Response(JSON.stringify({isSuccess: true, message: "Details Updated"}), {status: 200});
    }else{
        return new Response(JSON.stringify({isSuccess: false, message: "Unknown Server Error"}), {status: 500});
    }
}