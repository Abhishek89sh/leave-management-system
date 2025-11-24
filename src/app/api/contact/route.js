import Contacts from "../../../../models/Contacts";

export async function POST(req){
    const data = await req.json();
    if(!data.name, !data.email, !data.message) return new Response(JSON.stringify({isSuccess: false, message: "Invalid Request"}), {status: 400});
    const newContact = await Contacts.insertOne(data);
    if(!newContact) return new Response(JSON.stringify({isSuccess: false, message: "Message Not Sent, Please Try Again Later"}), {status: 500});
    return new Response(JSON.stringify({isSuccess: true, message: "Message Sent, We will get back to you as soon as possible"}), {status: 500});
}