"use client"

import React, { useState } from 'react'

import styles from '../../login/login.module.css'
import { imgs } from '@/content/main'
import Image from 'next/image'
import { useSelectUser } from '../../../../Context/selectUser/SelectUserProvider'

function page() {
  const [headId, setHeadId] = useState("");
  const [validated, setValidated] = useState(false);
  
  const selectUser = useSelectUser();
  const selectBtnClick = async ()=>{
    let selectedUser = await selectUser("Select Your Head");
    setHeadId(selectedUser)
  }
  return (
    <div className={styles.container}>
        <div className={styles.left}>
          <Image
            src={imgs.loginPageImg}
            alt="Register Illustration"
            fill
            className={styles.bgImage}
          />
        </div>

      <div className={styles.right}>
        <div className={styles.formBox}>
          <h1>Select Your Head</h1>
          <p className={styles.subtitle}>
            HOD/Principle who accepts or rejects your Leave Requests
          </p>

          <div>
            <div className={styles.inputGroup}>
              <input type="text" value={headId} onChange={(e)=>setHeadId(e.target.value)} placeholder="Enter ID Manually" required />
            </div>

            {validated?(
                <button className={styles.loginBtn}>
                    Submit Request
                </button>
            ):(
                <>
                {headId.length === 0?(
                    <button onClick={selectBtnClick} className={styles.loginBtn}>
                      Search For Id
                    </button>
                ):(
                    <button className={styles.loginBtn}>
                      Validate ID
                    </button>
                )}
                </>
            )}
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default page