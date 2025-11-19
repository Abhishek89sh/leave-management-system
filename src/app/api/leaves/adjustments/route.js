import { authUser } from "../../../../../functions/authUser";
import { connectDB } from "../../../../../lib/db";
import Leaves from "../../../../../models/Leaves";


export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const auth = searchParams.get("auth");

    if (!auth) {
      return Response.json({
        isSuccess: false,
        message: "Auth ID required"
      });
    }

    const data = await Leaves.aggregate([
      { $unwind: "$adjustments" },

      {
        $match: {
          "adjustments.assignedTo": auth,
          "adjustments.status": "pending"
        }
      },

      {
        $project: {
          _id: "$adjustments._id",
        //   requestBy: "$requestBy",
          name: "$name",
          designation: "$designation",
          department: "$department",
          leaveDate: "$date",
          work: "$adjustments.work",
          time: "$adjustments.time",
          subject: "$adjustments.subject",
          status: "$adjustments.status"
        }
      }
    ]);

    return Response.json({
      isSuccess: true,
      data
    });

  } catch (error) {
    return Response.json({
      isSuccess: false,
      message: error.message
    });
  }
}


export async function PUT(req){
  const data = await req.json();
  if(!data.status || !data.auth || !data.adjustmentId) return new Response(JSON.stringify({isSuccess: false, message: "Invalid Request"}), {status: 400});
  try{
    const isAuth = await authUser(data.auth);
    if(!isAuth) return new Response(JSON.stringify({isSuccess: false, message: "Unauthorized User"}), {status: 401});
    const isUpdated = await Leaves.updateOne(
      { "adjustments._id": data.adjustmentId },   
      { $set: { "adjustments.$.status": data.status } } 
    )
    if(isUpdated.modifiedCount === 0) return new Response(JSON.stringify({isSuccess: false, message: "Adjustment Not Updated"}), {status: 404});
    return new Response(JSON.stringify({isSuccess: true, data: isUpdated}), {status: 200});
  }catch (err){
    console.log(err);
    return new Response(JSON.stringify({isSuccess: false, message: "Uknonwn Server Side Error"}), {status: 500});
  }
}