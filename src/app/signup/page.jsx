import { imgs } from '@/content/main'
import Image from 'next/image'
import styles from '../login/login.module.css'
import Link from 'next/link'
import SignUpForm from '../../../components/SignUpForm'

function RegisterPage() {
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
            <h1>Create Account</h1>
            <p className={styles.subtitle}>
              Register now to experience smooth, paperless leave management
            </p>
            <SignUpForm />
            <p className={styles.footerText}>
              Already have an account? <Link href={"/login"}>Login Here</Link>
            </p>
          </div>
      </div>
    </div>
  )
}

export default RegisterPage
