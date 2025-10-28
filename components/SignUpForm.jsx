"use client"


import styles from '@/app/login/login.module.css'
import { useEffect, useState } from "react";
import Loader from "./loader/Loader";
import { decryptData, encryptData } from '../functions/protectData';
import { useRouter } from 'next/navigation';
import { useConfirm } from '../Context/ConfirmDialog/ConfirmDialogProvider';
import { sendOtp } from '../functions/sendOtp';

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading...");
  const router = useRouter();
  const Confirm = useConfirm();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errMsgs, setErrMsgs] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  })

  const handleFormChange = (e)=>{
    let {name, value} = e.target;
    if(name == "email"){
      value = value.toLowerCase();
    }
    setSignUpData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const readData = async ()=>{
    let data = localStorage.getItem("signUpData");
    if(!data) return;
    let toContinue = await Confirm(
      "Hey! We found some of your previous signup details. Want to use them again to save time?",
      "Details Found!!",
    );
    if(!toContinue) return;
    data = await JSON.parse(data);
    let pass = decryptData(data.password);
    setSignUpData({name: data.name, email: data.email, password: pass, confirmPassword: pass})
  }

  useEffect(()=>{
    if(signUpData.name.length && signUpData.name.length < 3){
      setErrMsgs({...errMsgs, nameErr: "Enter a valid Name"});
    }else{
      setErrMsgs({...errMsgs, nameErr: ""});
    }
  }, [signUpData.name])

  useEffect(()=>{
    if(signUpData.email.length && (signUpData.email.length < 5 || !signUpData.email.includes('@') || !signUpData.email.includes('.'))){
      setErrMsgs({...errMsgs, emailErr: "Enter a valid Email"});
    }else{
      setErrMsgs({...errMsgs, emailErr: ""});
    }
  }, [signUpData.email])

  useEffect(()=>{
    if(signUpData.password.length && signUpData.password.length < 7){
      setErrMsgs({...errMsgs, passwordErr: "Password must containg 7 charcters"});
    }else{
      setErrMsgs({...errMsgs, passwordErr: ""});
    }
  }, [signUpData.password])

  useEffect(()=>{
    if(signUpData.confirmPassword.length && signUpData.confirmPassword !== signUpData.password){
      setErrMsgs({...errMsgs, confirmPasswordErr: "Password Not Matched"});
    }else{
      setErrMsgs({...errMsgs, confirmPasswordErr: ""});
    }
  }, [signUpData.confirmPassword])


  const storeSignupData = async ()=>{
    setLoading(true);
    if(signUpData.name.length < 3){
      setErrMsgs({...errMsgs, nameErr: "Enter a valid Name"});
    }else if(signUpData.email.length < 5 || !signUpData.email.includes('@') || !signUpData.email.includes('.')){
      setErrMsgs({...errMsgs, emailErr: "Enter a valid Email"});
    }else if(signUpData.password.length < 7){
      setErrMsgs({...errMsgs, passwordErr: "Password must containg 7 charcters"});
    }else if(signUpData.confirmPassword !== signUpData.password){
      setErrMsgs({...errMsgs, confirmPasswordErr: "Password Not Matched"});
    }else{
      let data = signUpData;
      let encryotedPass = encryptData(data.password);
      let jsonData = JSON.stringify({name: data.name, email: data.email, password: encryotedPass});
      localStorage.setItem("signUpData", jsonData);
      // Email OTP 
      setLoadingMsg("Sending OTP via Email...");
      const resData = await sendOtp(signUpData.name, signUpData.email)
      setLoadingMsg("Email Sent Succesfully");
      if(resData.success){
        router.push("/signup/otp");
      }else{
        await Confirm("Something went wrong, Email not sent...", "Error", false);
        router.push("/signup/otp");
        setLoading(false)
      }
      setLoadingMsg("Loading...");
      return
    }
    
    setLoading(false);
  }

  useEffect(()=>{
    readData()
  }, [])
  

  return (
    <>
      {loading && <div className="loaderBox fullTop"><Loader text={loadingMsg}  /></div>}
      <div>
        <div className={styles.inputGroup}>
          <input maxLength={50} value={signUpData.name} onChange={handleFormChange} name="name" style={{ borderColor: errMsgs.nameErr && 'var(--error)' }} type="text" placeholder="Full Name" />
          <p className={styles.errMsg}>{errMsgs.nameErr}</p>
        </div>

        <div className={styles.inputGroup}>
          <input maxLength={100} value={signUpData.email} onChange={handleFormChange} name="email" style={{ borderColor: errMsgs.emailErr && 'var(--error)' }} type="email" placeholder="Email address" />
          <p className={styles.errMsg}>{errMsgs.emailErr}</p>
        </div> 

        <div className={styles.inputGroup}>
          <input maxLength={70} value={signUpData.password} onChange={handleFormChange} name="password" style={{ borderColor: errMsgs.passwordErr && 'var(--error)' }} type="password" placeholder="Password" autoComplete='off'  />
          <p className={styles.errMsg}>{errMsgs.passwordErr}</p>
        </div>

        <div className={styles.inputGroup}>
          <input maxLength={70} value={signUpData.confirmPassword} onChange={handleFormChange} name="confirmPassword" style={{ borderColor: errMsgs.confirmPasswordErr && 'var(--error)' }} type="password" placeholder="Confirm Password" autoComplete='off' />
          <p className={styles.errMsg}>{errMsgs.confirmPasswordErr}</p>
        </div>

        <button onClick={storeSignupData} className={styles.loginBtn}>
          Sign Up
        </button>
      </div>
    </>
  )
}