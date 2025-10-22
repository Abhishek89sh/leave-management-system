"use client"

import { commonDetails } from '@/content/main'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import styles from './nav.module.css'

import { ThemeContext } from '../../Context/ThemeProvider';


import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";


import { NavControlerContext } from '../../Context/NavControlerProvider'
import { useRouter } from 'next/navigation'

function Nav({type}) {
  const router = useRouter();
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [barIconColor, setBarIconColor] = useState();
  const {show, setShow} = useContext(NavControlerContext);
  return (
    <div className={styles.nav}>
      <div>
        <FaBars onClick={()=>setShow(true)} className={styles.bars} color='#fff' size={25} />
        <Image src={commonDetails.logoText} width={150} height={80} alt='HoliDesk Logo'></Image>
      </div>
      <div>
        {/* <section>
          <IoSearch size={20} />
          <p>Search Keyword</p>
        </section> */}
        <span onClick={toggleTheme}>
          {theme == "light"?<IoMoonOutline size={20} />:<MdOutlineWbSunny size={20} />}
        </span>
        <span onClick={()=>router.push(`/dashboard/${type}/settings`)}>
          <FaRegUser size={20} />
        </span>
      </div>
    </div>
  )
}

export default Nav
