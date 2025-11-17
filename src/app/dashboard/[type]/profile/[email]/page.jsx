"use client";

import Image from "next/image";
import styles from "./profile.module.css";
import React, { useEffect, useState } from "react";
import { useConfirm } from "../../../../../../Context/ConfirmDialog/ConfirmDialogProvider";
import { useRouter } from "next/navigation";
import Loader from "../../../../../../components/loader/Loader";
import { getCookie } from "../../../../../../functions/cookies";

const UserProfile = ({params}) => {
  const {email} = React.use(params);
  const Confirm = useConfirm();
  const router = useRouter();
  const [loading, setLoading] = useState({status: true, message: ""});
  const [user, setUser] = useState({});
  const checkEmail = async ()=>{
    if(email.includes('@') || !email.includes('.')){
        await Confirm("Requested email is not valid.", "Invalid Email", false);
        router.back();
        return false;
    }
    return true;
  }

  const readData = async ()=>{
    setLoading({status: true, message: "Loading..."});
    const authToken = getCookie("auth");
    if(!authToken){
        await Confirm("Token not found! Please Login Again", "Unauthorized", false);
        setLoading({status: false, message: "Loading..."});
        return;
    }
    const res = await fetch(`/api/users/profile?auth=${authToken}&email=${email}`);
    const resData = await res.json();
    if(!resData.isSuccess){
        await Confirm(resData.message, "Error", false);
        router.back();
        setLoading({status: false, message: "Loading..."});
        return;
    }
    let userDetails = resData.data;
    if(!resData.image || !resData.image.length){
        console.log("User Image Changed")
        userDetails = {...userDetails, image: "/assets/images/user.png"}
        console.log(userDetails);
    }
    setLoading({status: false, message: "Loading..."});
    setUser(userDetails);
  }

  const details = Object.entries(user).filter(
    ([key]) => !["_id","image", "name", "role"].includes(key)
  );

  useEffect(()=>{
    const isCorrectEmail = checkEmail();
    if(isCorrectEmail){
        readData();
    }
  },[])

  if(loading.status){
    return <div className="loaderBox fullTop"><Loader text={loading.me} /></div>
  }

  return (
    <div className={`${styles.profileContainer}`}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.imageWrapper}>
            <Image
              src={user.image}
              alt={user.name}
              width={120}
              height={120}
              className={styles.profileImage}
              priority
            />
          </div>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userRole}>{user.role}</p>
        </div>

        <div className={styles.profileDetails}>
          {details.map(([key, value]) => (
            <div key={key} className={styles.detailItem}>
              <span className={`${styles.label} ${styles.capitalize}`}>
                {key.replace(/([A-Z])/g, " $1")}:
              </span>
              <span
                className={`${styles.value} ${
                  key.toLowerCase().includes("leave") ? styles.success : ""
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* <div className={styles.profileActions}>
          <button className={`${styles.btn} ${styles.primary}`}>
            Edit Profile
          </button>
          <button className={`${styles.btn} ${styles.secondary}`}>
            Request Leave
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UserProfile;