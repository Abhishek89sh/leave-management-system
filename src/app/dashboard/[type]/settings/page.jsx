"use client";

import React, { useContext, useState } from "react";
import styles from "./settings.module.css";
import { FiMail, FiGlobe, FiUser } from "react-icons/fi";
import { ThemeContext } from "../../../../../Context/ThemeProvider";

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [user, setUser] = useState({
    name: "Abhishek Sharma",
    email: "abhishek@example.com",
    image: "/assets/images/developer.jpeg",
  });

  const handleImageChange = () => {
    alert("Change image clicked! (Add file upload here)");
  };


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
      </div>
    </div>
    </div>
  );
};

export default SettingsPage;
