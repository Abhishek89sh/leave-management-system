"use client"

import Aside from "../../../../components/aside/Aside"
import NavControlerProvider from "../../../../Context/NavControlerProvider";
import Nav from "../../../../components/nav/Nav"
import React, { useEffect, useState } from "react";
import Loader from "../../../../components/loader/Loader";
import { useConfirm } from "../../../../Context/ConfirmDialog/ConfirmDialogProvider";
import { useRouter } from "next/navigation";
import details from "../../../../functions/details";

export default function AdminLayout({ children, params }) {
    const { type } = React.use(params);
    const router = useRouter();
    const Confirm = useConfirm();
    const [loading, setLoading] = useState({ status: true, message: "Loading..." });
    const [userInfo, setUserInfo] = useState(null);
    const checkType = async ()=>{
        if(type != "admin" && type != "principal" && type != "faculty" && type != "hod"){
            await Confirm(`You are requesting for ${type}'s dashboard, which is not available.\n Don't worry, We will redirect you to correct path`, "Wrong Path", false);
            router.push("/dashboard");
            return false
        }
        return true
    }
    const readDetails = async () => {
        setLoading({status: true, message:  "Getting Your Details"});
        const userDetails = await details();
        setUserInfo(userDetails);
        if (!userDetails) {
            setLoading({status: true, message: "Session Expired"});
            await Confirm("Session Expired Or Not Found. Please Login Again", "Session Expired", false);
            router.push("/login");
            return
        }
        setLoading({status: true, message: "Checking Details Just a Sec"});
        if (userDetails.role === "unset" || userDetails.department === "unset" || userDetails.head === "unset") {
            await Confirm("Complete Signup Process Before Proceeding..", "Action Required", false);
            setLoading({status: true, message: "Redirecting..."});
            router.push("/signup/details");
            return
        }

        if (!userDetails.status || userDetails.status != "active") {
            setLoading({status: true, message: "Redirecting..."});
            router.push("/pending");
            return
        }

        if(type.trim() != userDetails.role){
            let openCorrectDashboard = await Confirm(`Hold on! You're in wrong room 😅 - only ${type}'s allowed. \n Let's take you to your ${userDetails.role}'s dashboard or login again`);
            if(openCorrectDashboard){
                router.push(`/dashboard/${userDetails.role}`);
            }else{
                router.push("/login");
            }
            return
        }

        setLoading({status: false})
    }

    

    useEffect(() => {
        (async ()=>{
            let isNext = await checkType();
            if(isNext){
                await readDetails();
            }
        })();
    }, [])
    return (
        <>
            <NavControlerProvider>
                <Nav type={type} />
                {loading.status?<>
                    <div className="loaderBox"><Loader text={loading.message} /></div>
                </>:<>
                <div className="dashLayout">
                    <div className="d-1">
                        <Aside manageRequests={userInfo.manageRequests} userName={userInfo.name}  type={type} />
                    </div>
                    <div className="d-2">
                        {children}
                    </div>
                </div>
                </>}
            </NavControlerProvider>
        </>
    )
}