import { connectDB } from "../../../../../lib/db";
import Users from "../../../../../models/Users";

export async function POST(req){
    const {email, status} = await req.json();
    if(!email || !status){
        return new Response(JSON.stringify({isSuccess: false, message: "Details not found"}), {status: 401});
    }
    await connectDB();
    const result = await Users.updateOne(
        {email: email},
        {$set: {status: status}}
    )


    if(result.modifiedCount === 1){
        return new Response(JSON.stringify({isSuccess: true, message: "Status Updated"}), {status: 200});
    }
    return new Response(JSON.stringify({isSuccess: false, message: "Unknown Server Side Error"}), {status: 500});
}