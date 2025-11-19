"use server"

import { authUser } from "../../../../../functions/authUser";
import Leaves from "../../../../../models/Leaves";

export async function POST(req){
    const data = await req.json();
    let errRes = null;
    if(!data.requestBy) errRes = {isSuccess: false, message: "Unauthorized User", status: 400};
    if(!data.name) errRes = {isSuccess: false, message: "Unable to read name", status: 401};
    if(!data.designation) errRes = {isSuccess: false, message: "Unable to read designation", status: 401};
    if(!data.department) errRes = {isSuccess: false, message: "Unable to read department", status: 401};
    if(!data.days) errRes = {isSuccess: false, message: "Unable to read days", status: 401};
    if(!data.purpose) errRes = {isSuccess: false, message: "Unable to read purpose", status: 401};
    if(!data.date) errRes = {isSuccess: false, message: "Unable to read date", status: 401};
    if(!data.adjustments) errRes = {isSuccess: false, message: "Unable to read adjustments", status: 401};
    if(errRes) return new Response(JSON.stringify({isSuccess: false, message: errRes.message}), {status: errRes.status});
    
    try{
        const authorization = await authUser(data.requestBy);
        if(!authorization) return new Response(JSON.stringify({isSuccess: false, message: "Unauthorized User"}), {status: 400});

        const newLeave = await Leaves.create(data);
        if(!newLeave || !newLeave._id){
            return new Response(JSON.stringify({isSuccess: false, message: "Error in creating a new leave"}), {status: 500});
        }
        return new Response(JSON.stringify({isSuccess: true, message: "Success"}), {status: 200});
    }catch (err){
        console.log(err);
        return new Response(JSON.stringify({isSuccess: false, message: "Unknown Server Side Error"}), {status: 500});
    }
}