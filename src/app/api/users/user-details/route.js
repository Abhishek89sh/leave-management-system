import { connectDB } from "../../../../../lib/db";
import Users from "../../../../../models/Users";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("auth");
    const ADMIN_ID = process.env.ADMIN_ID;
    if (userId === ADMIN_ID) return new Response(JSON.stringify({ isSuccess: true, data: { name: "Abhishek", email: ADMIN_ID, department: "all", manageRequests: true, role: "admin", status: "active" } }), { status: 200 })
    if (!userId) return new Response(JSON.stringify({ isSuccess: false, message: "Invalid Request URL" }), { status: 400 });
    await connectDB();
    const data = await Users.findOne({ _id: userId }).select("-password -__v");
    if (!data) return new Response(JSON.stringify({ isSuccess: false, message: "Unknown Server Side Error" }), { status: 500 });
    
    return new Response(JSON.stringify({ isSuccess: true, data: data }), { status: 200 });
}