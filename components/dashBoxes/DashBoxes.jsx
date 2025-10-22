"use client"

import styles from './dashBoxes.module.css'

import React, { useEffect, useState } from 'react'
import {  FaUsers } from 'react-icons/fa'
import { RiPagesLine } from 'react-icons/ri'
import {LiaBalanceScaleLeftSolid} from 'react-icons/lia'
import {GiConfirmed} from 'react-icons/gi'
import Loader from '../loader/Loader'

function DashBoxes({type}) {
  const [decidedBox, setDecidedBox] = useState(null);
  const decideBoxes = ()=>{
    switch(type){
      case "admin":
        setDecidedBox(<AdminBoxes />);
        break;
      case "faculty":
        setDecidedBox(<FacultyBoxes />);
        break;
      default:
        setDecidedBox(<FacultyBoxes />)
    }
  }

  useEffect(()=>{
    decideBoxes();
  }, [])
  
  return(
    <>{decidedBox?decidedBox:<div style={{height: '70vh'}} className='loaderBox'><Loader /></div>}</>
  )
}

function AdminBoxes() {
  return (
      <div className={styles.boxes}>
        <div className={styles.box}>
          <span className={styles.icon}><FaUsers size={40} /></span>
          <h2>Total Users</h2>
          <p>1,250</p>
        </div>
        <div className={styles.box}>
          <span className={styles.icon}><RiPagesLine size={40} /></span>
          <h2>Pending Requests</h2>
          <p>87</p>
        </div>
        <div className={styles.box}>
          <span className={styles.icon}><FaUsers size={40} /></span>
          <h2>Active Users</h2>
          <p>980</p>
        </div>
        <div className={styles.box}>
          <span className={styles.icon}><RiPagesLine size={40} /></span>
          <h2>Resolved Requests</h2>
          <p>410</p>
        </div>
        <div className={styles.box}>
          <span className={styles.icon}><FaUsers size={40} /></span>
          <h2>Admins</h2>
          <p>12</p>
        </div>
        <div className={styles.box}>
          <span className={styles.icon}><RiPagesLine size={40} /></span>
          <h2>Reports</h2>
          <p>34</p>
        </div>
    </div>
  );
}

function FacultyBoxes(){
  return(
    <div className={styles.boxes}>
      <div className={styles.box}>
        <span className={styles.icon}><LiaBalanceScaleLeftSolid size={40} /></span>
        <h2>Leaves Left</h2>
        <p>4</p>
      </div>
      <div className={styles.box}>
        <span className={styles.icon}><RiPagesLine size={40} /></span>
        <h2>My Requests</h2>
        <p>3</p>
      </div>
       <div className={styles.box}>
        <span className={styles.icon}><GiConfirmed size={40} /></span>
        <h2>Confirmed Leaves</h2>
        <p>13</p>
      </div>
    </div>
  )
}

export default DashBoxes
