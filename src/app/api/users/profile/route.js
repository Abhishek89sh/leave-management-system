import { authUser } from "../../../../../functions/authUser";
import Users from "../../../../../models/Users";

export async function GET(req){
    const {searchParams} = new URL(req.url);
    const auth = searchParams.get("auth");
    const email = searchParams.get("email");
    if(!auth || !email) return new Response(JSON.stringify({isSuccess: false, message: "Invalid req URL"}), {status: 400});
    const isValid = await authUser(auth);
    if(!isValid) return new Response(JSON.stringify({isSuccess: false, message: "Unauthorized User"}), {status: 401});
    const data = await Users.findOne({email}).select("-__v -password -updatedAt");
    if(!data) return new Response(JSON.stringify({isSuccess: false, message: "User Not Found"}), {status: 404});
    const renamedData = Object.fromEntries(
        Object.entries(data.toObject()).map(([key, value]) => {
            if (key === "createdAt") return ["joinedOn", value.toLocaleDateString("en-GB")]
            if(key === "manageRequests") return ["manageRequests", `${value}`]
            return [key, value];
        })
    );
    return new Response(JSON.stringify({isSuccess: true, data: renamedData}), {status: 200});
}