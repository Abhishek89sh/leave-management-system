import { imgs } from '@/content/main'
import Image from 'next/image'
import React from 'react'
import styles from './login.module.css'
import Link from 'next/link'
import LoginForm from '../../../components/LoginForm'

function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image
          src={imgs.loginPageImg}
          alt="Login Illustration"
          fill
          className={styles.bgImage}
        />
      </div>

      <div className={styles.right}>
        <div className={styles.formBox}>
          <h1>Welcome Back</h1>
          <p className={styles.subtitle}>Login to continue to your account</p>

          <LoginForm />

          <p className={styles.footerText}>
            New here? <Link href="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
