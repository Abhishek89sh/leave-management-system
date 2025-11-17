import { authUser } from "../../../../../functions/authUser";
import { connectDB } from "../../../../../lib/db";
import Users from "../../../../../models/Users";

export async function GET(req){
    const {searchParams} = new URL(req.url);
    const auth = searchParams.get("auth");
    const status = searchParams.get("status");
    const department = searchParams.get("department");
    const isAll = searchParams.get("isAll");
    let skips = searchParams.get("skips");
    let limit = searchParams.get("limit");
    if(!auth) return new Response(JSON.stringify({isSuccess: false, message: "Invalid Req URL"}), {status: 400});
    const isAuth = await authUser(auth);
    if(!isAuth) return new Response(JSON.stringify({isSuccess: false, message: "Unauthorized User"}), {status: 401});
    let query;
    if(!isAll){
        query = {head: auth}
    }
    if(status) query = {...query, status: status};
    if(department) query = {...query, department: department};
    await connectDB();
    if(!skips) skips = 0;
    if(!limit) limit = 20;
    const data = await Users.find(query).select("-__v -password").skip(skips).limit(limit).sort({createdAt: -1});
    if(!data) return new Response(JSON.stringify({isSuccess: false, message: "Unknown Server Side Error"}), {status: 500});
    return new Response(JSON.stringify({isSuccess: true, data: data}), {status: 200});
}