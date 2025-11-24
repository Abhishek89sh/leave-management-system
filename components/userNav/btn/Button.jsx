"use client"

import React, { useEffect, useState } from 'react'
import { getCookie } from '../../../functions/cookies';
import Link from 'next/link';
import Styles from './btn.module.css'

function Button() {
  const [btn, setBtn] = useState(<Link href={"/"}>Loading..</Link>)
  const isLoggedIn = ()=>{
    const userAuthToken = getCookie("auth");
    if(userAuthToken){
        setBtn(<Link className={Styles.primaryBtn}  href={"/dashboard"}>Go To Dashboard</Link>)
    }else{
        setBtn(<Link className={Styles.primaryBtn}  href={"/login"}>Login</Link>)
    }
  }

  useEffect(()=>{
    isLoggedIn();
  }, [])
  return btn
}

export default Button
