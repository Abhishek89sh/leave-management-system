"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./settings.module.css";
import { FiMail, FiGlobe, FiUser } from "react-icons/fi";
import { ThemeContext } from "../../../../../Context/ThemeProvider";
import details from "../../../../../functions/details";
import { deleteCookie } from "../../../../../functions/cookies";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "/assets/images/user.png",
  });

  const fetchUserData = async ()=>{
    const data = await details();
    let image;
    if(data.profile){
      image= data.profile
    }
    setUser({
      name: data.name,
      email: data.email,
      image: image
    })
  }

  const logoutUser = ()=>{
    deleteCookie("auth");
    router.push("/");
  }

  const handleImageChange = () => {
    
  };

  useEffect(()=>{
    fetchUserData();
  }, [])


  return (
    <div className="mainBox" >
    <div className={`${styles.settingsContainer} ${theme}`}>
      {/* User Info Section */}
      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <img
            src={user.image}
            alt="User"
            className={styles.profileImage}
          />
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <button onClick={handleImageChange} className={styles.changeImageBtn}>
          Change Image
        </button>
      </div>

      <div className={styles.section}>
        <h3>User Details</h3>
        <div className={styles.form}>
          <label>Name:</label>
          <input type="text" />
          <label>Email:</label>
          <input type="email" />
          <button>Save Changes</button>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Theme Settings</h3>
        <div className={styles.themeRow}>
          <span>Current Theme: {theme}</span>
          <button onClick={toggleTheme} className={styles.themeBtn}>
            {theme === "light"? "Switch To Dark" : "Switch To Light"}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Notifications</h3>

        <div className={styles.notifHeader}>
          <span>Type</span>
          <span><FiMail /> Email</span>
          <span><FiGlobe /> Web</span>
        </div>

          <div className={styles.notifRow}>
            <span>Web Updates</span>
            <input
              type="checkbox"
            />
            <input
              type="checkbox"
            />
          </div>
          <button onClick={logoutUser} className={styles.logoutBtn}>Log Out</button>
      </div>
    </div>
    </div>
  );
};

export default SettingsPage;
