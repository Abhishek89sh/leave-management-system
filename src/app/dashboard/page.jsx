"use client"

import { useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import details from "../../../functions/details";
import { useConfirm } from "../../../Context/ConfirmDialog/ConfirmDialogProvider";
import { useRouter } from "next/navigation";

export default function page(){
    const [loadingMsg, setLoadingMsg] = useState("Loading...");
    const Confirm = useConfirm();
    const router = useRouter();
    const readDetails = async ()=>{
        setLoadingMsg("Getting Your Details");
        const userDetails = await details();
        if(!userDetails){
            setLoadingMsg("Session Expired");
            await Confirm("Session Expired Or Not Found. Please Login Again", "Session Expired", false);
            router.push("/login");
            return
        }
        setLoadingMsg("Checking Details, Just a sec");
        if(userDetails.role === "unset" || userDetails.department === "unset" || userDetails.head === "unset"){
            await Confirm("Complete Signup Process Before Proceeding..", "Action Required", false);
            setLoadingMsg("Redirecting...");
            router.push("/signup/details");
        }
        setLoadingMsg("Opening Dashboard");
        router.push(`/dashboard/${userDetails.role.toLowerCase()}`);
    }

    useEffect(()=>{
        readDetails();
    }, []);
    return(
        <div className="loaderBox fullTop"><Loader text={loadingMsg} /></div>
    )
}