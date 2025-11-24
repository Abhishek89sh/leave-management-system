"use client"

import React, { useState } from 'react'

import styles from './Contact.module.css'



function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState({message: "", color: "red"});

  const submitForm = async ()=>{
    setErrMsg({message: "Loading...", color: "green"})
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({name, email, message})
    })
    const resData = await res.json();
    setErrMsg({message: resData.message, color: resData.isSuccess ? "green" : "red"})
  }
  return (
    <div className={styles.contactForm}>
      <input value={name} onChange={(e)=>setName(e.target.value)} maxLength={50} type="text" placeholder="Your Name" className={styles.input} required />
      <input value={email} onChange={(e)=>setEmail(e.target.value)} maxLength={200} type="email" placeholder="Your Email" className={styles.input} required />
      <textarea value={message} onChange={(e)=>setMessage(e.target.value)} maxLength={2000} placeholder="Your Message" className={styles.textarea} required></textarea>
      <p style={{color: errMsg.color}} className={styles.errMsg}>{errMsg.message}</p>
      <button onClick={submitForm} className={styles.contactBtn}>Send Message</button>
    </div>
  )
}

export default ContactForm
