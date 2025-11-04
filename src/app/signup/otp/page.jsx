"use client"

import React, { useEffect, useState } from 'react'
import Otp from '../../../../components/otp/Otp'
import { useConfirm } from '../../../../Context/ConfirmDialog/ConfirmDialogProvider'
import { useRouter } from 'next/navigation';
import Loader from '../../../../components/loader/Loader';

function page() {
  const Confirm = useConfirm();
  const router = useRouter();
  const [signUpData, setSignUpData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  var signupDataJson = null;
  const readData = async ()=>{
    signupDataJson = await localStorage.getItem("signUpData");
    let data = await JSON.parse(signupDataJson);
    setSignUpData(data)
    
    if(!data){
      await Confirm("Signup details not found, Try Again...", "Data Not Found", false);
      router.push("/signup");
    }
  }

  const submitOtp = async (otp)=>{
    if(!signUpData){
      await Confirm("Signup details not found, Try Again...", "Data Not Found", false);
      router.push("/signup");
      return
    }
    setLoading(true);
    let res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        otp: otp
      })
    })
    let data = await res.json();
    if(data.success){
      localStorage.removeItem("signUpData")
      router.push("/signup/details");
    }else{
      setErrMsg(data.message);
    }
    setLoading(false);
  }

  useEffect(()=>{
    readData();
  }, [])
  return (
    <>
    {signUpData?(
      <Otp
        heading='Email Validation'
        subHeading = "Enter OTP Sent to your email"
        onSubmit={submitOtp}
        name={signUpData.name}
        email={signUpData.email}
        isLoading={loading}
        errMsg={errMsg}
     />
    ):(<div className='loadingBox'><Loader /></div>)}
    </>
  )
}

export default page