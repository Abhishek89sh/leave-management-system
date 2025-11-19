import { authUser } from "../../../../../functions/authUser";
import Leaves from "../../../../../models/Leaves";
import Users from "../../../../../models/Users";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        const auth = searchParams.get("auth");
        const limit = parseInt(searchParams.get("limit") || 20);
        const skip = parseInt(searchParams.get("skip") || 0);

        if (!auth) {
            return new Response(
                JSON.stringify({ isSuccess: false, message: "Invalid request URL" }),
                { status: 400 }
            );
        }

        const isAuth = await authUser(auth);
        if (!isAuth) {
            return new Response(
                JSON.stringify({ isSuccess: false, message: "Unauthorized User" }),
                { status: 401 }
            );
        }

        const data = await Leaves.aggregate([
            {
                $match: {
                    adjustments: {
                        $not: { $elemMatch: { status: { $ne: "approved" } } }
                    }
                }
            },

            {
                $addFields: {
                    requestByObj: { $toObjectId: "$requestBy" }
                }
            },

            {
                $lookup: {
                    from: "users",
                    localField: "requestByObj",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            { $unwind: "$userInfo" },

            {
                $match: {
                    "userInfo.head": auth
                }
            },

            {
                $project: {
                    _id: 1,
                    requestBy: 1,
                    userName: "$userInfo.name",
                    date: 1,
                    days: 1,
                    adjustments: 1
                }
            },

            { $skip: skip },
            { $limit: limit }
        ]);

        return new Response(
            JSON.stringify({ isSuccess: true, data }),
            { status: 200 }
        );

    } catch (err) {
        console.log(err);
        return new Response(
            JSON.stringify({ isSuccess: false, message: "Unknown Server Error" }),
            { status: 500 }
        );
    }
}
