"use client"

import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'


import styles from './aside.module.css'
import { adminNavBtns, facultyNavBtns, hodNavBtns, principalNavBtns } from '@/content/nav-buttons'
import { useRouter } from 'next/navigation'
import { FaRegUser } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { NavControlerContext } from '../../Context/NavControlerProvider'

function Aside({ type }) {
  const router = useRouter();
  const [profileImg, setProfileImg] = useState(null);
  const [btns, setBtns] = useState([]);
  const asideBar = useRef();
  
  const {show, setShow} = useContext(NavControlerContext);
  const toggeImg = ()=>{
    if(!profileImg){
      setProfileImg("/assets/images/developer.jpeg");
    }else{
      setProfileImg(null);
    }
  }

  const modifyBtns = ()=>{
    if(type === "faculty"){
      setBtns(facultyNavBtns);
    }else if(type === "principal"){
      setBtns(principalNavBtns)
    }else if(type === "hod"){
      setBtns(hodNavBtns)
    }else if(type === "admin"){
      setBtns(adminNavBtns)
    }else{
      
    }
  }

  useEffect(()=>{
    modifyBtns();
  }, [])
  return (
    <>
      <aside ref={asideBar} className={`${styles.aside} ${!show ? styles.asideHide : styles.asideShow}`}>
        <div onClick={()=>setShow(false)} className={`${styles.close}`}><MdClose size={30} /></div>
        <div className={styles.asideInner}>
          <section className={styles.sec1}>
              <span onClick={toggeImg}>
                  {profileImg?<Image src={profileImg} width={90} height={90} alt='User Images' />: <FaRegUser size={90} />}
              </span>
              <h2>Abhishek</h2>
          </section>
          <section className={styles.sec2}>
           {btns.map((item, index)=>(
            <div onClick={()=>{router.push(item.onClick); setTimeout(()=>setShow(false), 500)}} key={index}>
              <span>{item.icon}</span>
              <p>{item.name}</p>
            </div>
           ))}
          </section>
        </div>
      </aside>
      <div></div>
    </>
  )
}

export default Aside
