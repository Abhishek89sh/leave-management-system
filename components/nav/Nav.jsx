import { commonDetails } from '@/content/main'
import Image from 'next/image'
import React, { useContext } from 'react'
import styles from './nav.module.css'

import { ThemeContext } from '../Context/ThemeProvider';


import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

function Nav() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <div className={styles.nav}>
      <div>
        <Image src={commonDetails.logoText} width={150} height={80} alt='HoliDesk Logo'></Image>
      </div>
      <div>
        <section>
          <IoSearch size={20} />
          <p>Search Keyword</p>
        </section>
        <span onClick={toggleTheme}>
          {theme == "light"?<IoMoonOutline size={20} />:<MdOutlineWbSunny size={20} />}
        </span>
        <span>
          <FaRegUser size={20} />
        </span>
      </div>
    </div>
  )
}

export default Nav
