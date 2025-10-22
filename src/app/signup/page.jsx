import { imgs } from '@/content/main'
import Image from 'next/image'
import React from 'react'
import styles from '../login/login.module.css'
import Link from 'next/link'

function RegisterPage() {
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
          <h1>Create Account</h1>
          <p className={styles.subtitle}>
            Register now to experience smooth, paperless leave management
          </p>

          <form>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Full Name" required />
            </div>

            <div className={styles.inputGroup}>
              <input type="email" placeholder="Email address" required />
            </div>

            <div className={styles.inputGroup}>
              <input type="password" placeholder="Password" required />
            </div>

            <div className={styles.inputGroup}>
              <input type="password" placeholder="Confirm Password" required />
            </div>

            <div className={styles.inputGroup}>
              <select required>
                <option value="">Select Account Type</option>
                <option value="faculty">Faculty</option>
                <option value="hod">HOD</option>
                <option value="principal">Principal</option>
              </select>
            </div>

            <button type="submit" className={styles.loginBtn}>
              Sign Up
            </button>
          </form>

          <p className={styles.footerText}>
            Already have an account? <Link href="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
