import { connectDB } from "../lib/db";
import Users from "../models/Users";

export const authUser = async (userId)=>{
    if(!userId || userId.length != 24) return false;
    await connectDB();
    const user = await Users.findOne({_id: userId});
    if(user){
        return true;
    }else{
        return false;
    }
}