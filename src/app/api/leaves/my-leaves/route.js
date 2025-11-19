import Leaves from "../../../../../models/Leaves";
import Users from "../../../../../models/Users";

export async function GET(req){
    try{
        const {searchParams} = new URL(req.url);
        const auth = searchParams.get("auth");
        let limit = searchParams.get("limit");
        let skips = searchParams.get("skips");
        if(!auth) return new Response(JSON.stringify({isSuccess: false,message:"Invalid Request URL"}),{status:401});
        let query = {requestBy: auth};
        if(!limit) limit = 20;
        if(!skips) skips = 0;
        const data = await Leaves.find(query).select("-__v, -__updatedAt  ").limit(limit).skip(skips).sort({createdAt: -1});
        
        return new Response(JSON.stringify({isSuccess: true, data: data}), {status: 200});
    }catch (err){
        console.log(err);
        return new Response(JSON.stringify({isSuccess: false, message: "Unknown Server Side Error"}), {status: 500});
    }
}