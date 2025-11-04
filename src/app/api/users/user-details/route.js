import Users from "../../../../../models/Users";

export async function GET(req){
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get("auth");
    if(!userId) return new Response(JSON.stringify({isSuccess: false, message: "Invalid Request URL"}), {status: 400});
    const data = await Users.findOne({_id: userId}).select("-password -__v");
    if(!data) return new Response(JSON.stringify({isSuccess: false, message: "Unknown Server Side Error"}), {status: 500});
    return new Response(JSON.stringify({isSuccess: true, data: data}), {status: 200});
}