import { authUser } from "../../../../functions/authUser";
import { connectDB } from "../../../../lib/db";
import Users from "../../../../models/Users";

export async function GET(req){
    const {searchParams} =  new URL(req.url);
    const userId = searchParams.get("auth");
    const skips = searchParams.get("skips");
    if(!skips || !userId) return new Response(JSON.stringify({isSuccess: false, message: "Invalid Req URL"}), {status: 400});
    const authorized = await authUser(userId);
    if(!authorized) return new Response(JSON.stringify({isSuccess: false, message: "Unauthorized User"}), {status: 400});
    await connectDB();
    const data = await Users.find({manageRequests: true}).select("name department").skip(skips).limit(20);
    if(!data) return new Response(JSON.stringify({isSuccess: false, message: "Unknown Server Side Error"}), {status: 500})
    var finalData = [];
    data.forEach((element)=>{
        let obj = {
            name: element.name,
            id: element._id,
            department: element.department
        }
        finalData = [...finalData, obj]
    })
    return new Response(JSON.stringify({isSuccess: true, data: finalData}), {status: 200});
}