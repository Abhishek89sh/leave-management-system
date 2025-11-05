"use client"

import { useRouter } from 'next/navigation';
import styles from './pending.module.css'

const Pending = ({heading, message}) => {
    const router = useRouter();
    return (
    <div className={`${styles.reviewPage}`}>
      <div className={styles.reviewContainer}>
        <div className={styles.icon}>⏳</div>
        <h1>{heading}</h1>
        <p>
          {message}
        </p>
        <button onClick={()=>router.push("/login")} className={styles.backBtn}>Go to Login</button>
      </div>
    </div>
  );
};

export default Pending;