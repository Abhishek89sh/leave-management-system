import { authUser } from "../../../../../functions/authUser";
import Leaves from "../../../../../models/Leaves";
import Users from "../../../../../models/Users";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const auth = searchParams.get("auth");
        const leaveId = searchParams.get("leaveId");

        if (!auth || !leaveId) {
            return new Response(JSON.stringify({
                isSuccess: false,
                message: "Invalid request url"
            }), { status: 401 });
        }

        const isAuth = await authUser(auth);
        if (!isAuth) {
            return new Response(JSON.stringify({
                isSuccess: false,
                message: "Unauthorized User"
            }), { status: 400 });
        }

        let data = await Leaves.findById(leaveId)
            .select("-__v -updatedAt")
            .lean();

        if (!data) {
            return new Response(JSON.stringify({
                isSuccess: false,
                message: "Leave request not found"
            }), { status: 404 });
        }

        const userEmail = await Users.findById(data.requestBy)
            .select("email  head")
            .lean();

        if (Array.isArray(data.adjustments) && data.adjustments.length > 0) {
            data.adjustments = await Promise.all(
                data.adjustments.map(async (item) => {
                    const adjUser = await Users.findById(item.assignedTo)
                        .select("name email")
                        .lean();

                    return {
                        ...item,
                        name: adjUser?.name || "",
                        email: adjUser?.email || "",
                    };
                })
            );
        }

        let managedByName = "";
        let managedByEmail = "";

        if (data.managedBy) {
            const manager = await Users.findById(data.managedBy)
                .select("name email")
                .lean();

            managedByName = manager?.name || "";
            managedByEmail = manager?.email || "";
        }

        const finalData = {
            ...data,
            email: userEmail?.email || "",
            head: userEmail?.head || "",
            managedByName,
            managedByEmail
        };

        return new Response(JSON.stringify({
            isSuccess: true,
            data: finalData
        }), { status: 200 });

    } catch (err) {
        console.log("Server Error:", err);
        return new Response(JSON.stringify({
            isSuccess: false,
            message: "Unknown Server Side Error"
        }), { status: 500 });
    }
}
