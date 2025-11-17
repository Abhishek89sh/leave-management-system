import { authUser } from "../../../../../functions/authUser";
import Users from "../../../../../models/Users";

export async function DELETE(req){
    try{
        const {searchParams} = new URL(req.url);
        const auth = searchParams.get("auth");
        const userToDelete = searchParams.get("email");
        if(!auth || !userToDelete) return new Response(JSON.stringify({isSuccess: false, message: "Invalid Req Url"}), {status: 400});
        const authorization = await authUser(auth);
        if(!authorization) return new Response(JSON.stringify({isSuccess: false, message: "Unauthorized User"}), {status: 401});
        const isDeleted = await Users.deleteOne({email: userToDelete});
        if(isDeleted.deletedCount === 0) return new Response(JSON.stringify({isSuccess: false, message: "User not Exists"}), {status: 404});
        return new Response(JSON.stringify({isSuccess: true, message: "Deleted Succesfully"}), {status: 200});
    }catch (err){
        return new Response(JSON.stringify({isSuccess: false, message: err.message}), {status: 500});
    }
}