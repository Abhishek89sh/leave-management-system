"use client"

import { getCookie } from "./cookies";

export default async function details(){
    var userDetails = null;
    if(userDetails){
        console.log("Already Fetched");
        return userDetails;
    }
    const userAuthToken = getCookie("auth");
    if(!userAuthToken){
        return null
    }
    const res = await fetch(`/api/users/user-details?auth=${userAuthToken}`);
    const resData = await res.json();
    userDetails = resData.data;
    return resData.data;
}