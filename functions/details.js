"use client"

import { getCookie, setCookie } from "./cookies";

var userDetails = null;

export default async function details(){
    if(userDetails){
        console.log("Already Fetched");
        return userDetails;
    }
    const userAuthToken = getCookie("auth");
    if(!userAuthToken){
        return null
    }
    setCookie({name: "auth", value: userAuthToken, days: 1, path: "/"});
    const res = await fetch(`/api/users/user-details?auth=${userAuthToken}`);
    const resData = await res.json();
    if(resData.isSuccess){
        userDetails = resData.data;
        return resData.data;
    }else{
        return false
    }
    
}