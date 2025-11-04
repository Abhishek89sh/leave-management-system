"use client"

import React, { useEffect, useState } from 'react'

import styles from './otp.module.css'
import { imgs } from '@/content/main'
import Image from 'next/image'
import { sendOtp } from '../../functions/sendOtp'
import { useConfirm } from '../../Context/ConfirmDialog/ConfirmDialogProvider'
import Loader from '../loader/Loader'

function Otp({
    heading="OTP",
    onSubmit=()=>{},
    showRightImg=true,
    subHeading = "Enter OTP",
    name,
    email,
    isLoading = false,
    errMsg=""
}) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(isLoading);
  const [err, setErr] = useState(errMsg)
  let resendCalls = 0;
  const Confirm = useConfirm();
  const submitOtp = ()=>{
    if(otp.length === 6){
      onSubmit(otp)
    }else{
      setErr(`"${otp}" is not a valid OTP`)
    }
  }
  const runTimer = ()=>{
    const interval = setInterval(()=>{
      setTimer((prev)=>{
        if(prev<1){
          console.log(prev);
          clearInterval(interval);
          return 0;
        }
        return prev-1
      })
      return ()=>clearInterval(interval);
    }, 1000)
  }

  const resendOtp = async ()=>{
    setLoading(true)
    if(timer < 1){
      const isSend = await sendOtp(name, email);
      console.log(isSend)
      if(isSend.success){
        setLoading(false);
        await Confirm(`OTP is sent to ${email}, Please check your email`, "OTP Sent",  false);
        if(resendCalls == 0){
          setTimer(60);
          resendCalls++
        }else {
          setTimer(120);
        }
        runTimer();
        return;
      }
      setLoading(false)
      await Confirm( "OTP not sent... Please Try Again after some time", "Failed", false);
    }
  }

  useEffect(()=>{
    runTimer();
  }, [])

  useEffect(()=>{
    setErr(errMsg);
    setLoading(isLoading);
  }, [errMsg, isLoading])
  return (
    <div className={styles.container}>
      {showRightImg && (
        <div className={styles.left}>
          <Image
            src={imgs.loginPageImg}
            alt="Register Illustration"
            fill
            className={styles.bgImage}
          />
        </div>
      )}

      <div className={styles.right}>
        <div className={styles.formBox}>
          <h1>{heading}</h1>
          <p className={styles.subtitle}>
            {subHeading}
          </p>

          <div>
            <div className={styles.inputGroup}>
              <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" placeholder="Enter OTP" required />
              <p className='errMsg'>{err}</p>
            </div>
            
            <p style={{marginBottom: 20, textAlign: 'left', marginLeft: 10}} className={styles.footerText}>
                Not Recieved?
                <span onClick={resendOtp} style={{color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold'}}>
                    Resend {timer>0 ? ("in "+ timer + "s") : "OTP"}
                </span>
            </p>

            <button onClick={submitOtp} className={styles.loginBtn}>
              Submit
            </button>
          </div>

          {loading && <div className='loaderBox fullTop'><Loader /></div>}
        </div>
      </div>
    </div>
  )
}

export default Otp