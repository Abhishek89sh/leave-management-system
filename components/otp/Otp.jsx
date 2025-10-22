"use client"

import React from 'react'

import styles from './otp.module.css'
import { imgs } from '@/content/main'
import Image from 'next/image'

function Otp({
    heading="OTP",
    onSubmit=()=>{},
    showRightImg=true,
    subHeading = "Enter OTP"
}) {
  return (
    <div className={styles.container}>
      {showRightImg && (
        <div className={styles.left}>
          <Image
            src={imgs.loginPageImg}
            alt="Register Illustration"
            fill
            className={styles.bgImage}
          />
        </div>
      )}

      <div className={styles.right}>
        <div className={styles.formBox}>
          <h1>{heading}</h1>
          <p className={styles.subtitle}>
            {subHeading}
          </p>

          <form>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Enter OTP" required />
            </div>
            
            <p style={{marginBottom: 20, textAlign: 'left', marginLeft: 10}} className={styles.footerText}>
                Not Recieved?
                <span style={{color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold'}}>
                    Resend In 30s
                </span>
            </p>

            <button type="submit" className={styles.loginBtn}>
              Submit
            </button>
          </form>

          
        </div>
      </div>
    </div>
  )
}

export default Otp