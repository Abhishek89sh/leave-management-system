import { connectDB } from "../../../../lib/db";
import Users from "../../../../models/Users";

export async function POST(req){
    const {id} = await req.json();
    if(!id) return new Response(JSON.stringify({isSuccess: false, message: "ID Not FOUND"}), {status: 401});
    if(id.length != 24) return new Response(JSON.stringify({isSuccess: false, message: "INVALID ID"}), {status: 400});
    await connectDB();
    const data = await Users.findOne({_id: id}).select("name");
    if(!data) return new Response(JSON.stringify({isSuccess: false, message: "Invalid ID"}), {status: 400});
    return new Response(JSON.stringify({isSuccess: true, data: data}), {status: 200});
}