"use client"

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FaHome, FaRegUser } from 'react-icons/fa'

import styles from './aside.module.css'
import Icon from '../Icon'

function Aside() {
  const [profileImg, setProfileImg] = useState(null);
  const asideButtons = useRef();
  const toggeImg = ()=>{
    if(!profileImg){
      setProfileImg("/assets/images/developer.jpeg")
    }else{
      setProfileImg(null)
    }
  }
  const applyScroll = ()=>{
    var scrollY = window.scrollY;
    if(scrollY >= 85){
      asideButtons.current.style.overflowY = "scroll"
    }else{
      asideButtons.current.style.overflowY = "hidden"
    }
  }
  window.addEventListener("scroll", applyScroll);

  useEffect(()=>{
    applyScroll()
  }, [])
  return (
    <aside className={styles.aside}>
      <div className={styles.asideInner}>
        <section className={styles.sec1}>
            <span onClick={toggeImg}>
                {profileImg?<Image src={profileImg} width={90} height={90} alt='User Images' />: <FaRegUser size={90} />}
            </span>
            <h2>Abhishek</h2>
        </section>
        <section ref={asideButtons} className={styles.sec2}>
         {["Dashboard", "Users", "HODs", "Principles", "Requests", "Leaves", "Dashboard", "Users", "HODs", "Principles", "Requests", "Leaves", "Dashboard", "Users", "HODs", "Principles", "Requests", "Leaves", ].map((item, index)=>(
          <div key={index}>
            <span><Icon name={"FaHome"} lib={"fa"} color="#000" /></span>
            <p>{item}</p>
          </div>
         ))}
        </section>
      </div>
    </aside>
  )
}

export default Aside
