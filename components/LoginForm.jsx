"use client"

import { useEffect, useState } from "react"

import styles from '../src/app/login/login.module.css'
import Loader from "./loader/Loader";
import { useRouter } from "next/navigation";
import { encryptData } from "../functions/protectData";
import { getCookie, setCookie } from "../functions/cookies";

function LoginForm(){
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({email: "", password: ""});
    const [errMsgs, setErrMsgs] = useState({emailErr: "", passwordErr: ""});

    const router = useRouter();

    const handleFormDataChange = (e)=>{
        const {name , value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const login = async ()=>{
        if(!formData.email.includes("@") || !formData.email.includes(".")){
            setErrMsgs({...errMsgs, emailErr: "Enter a valid email"});
            return;
        }else{
            setErrMsgs({...errMsgs, emailErr: ""})
        }
        if(formData.password.length < 7){
            setErrMsgs({...errMsgs, passwordErr: "Password must contain 7 characters"})
            return;
        }else{
            setErrMsgs({...errMsgs, passwordErr: ""})
        }

        setLoading(true);
        const encodedPass = encryptData(formData.password);
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.email,
                password: encodedPass
            })
        });
        const data = await res.json();
        console.log(data);
        if(data.isSuccess){
            setCookie({name: "auth", value: data.data.id, days: 1, path: "/"});
            router.push(`/dashboard`);
        }else{
            setErrMsgs({...errMsgs, passwordErr: data.message});
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(formData.email.length > 0 && (!formData.email.includes("@") || !formData.email.includes("."))){
            setErrMsgs({...errMsgs, emailErr: "Enter a valid email"})
        }else{
            setErrMsgs({...errMsgs, emailErr: ""})
        }
    }, [formData.email])

    useEffect(()=>{
        if(formData.password.length > 0 && formData.password.length < 7){
            setErrMsgs({...errMsgs, passwordErr: "Password must contain 7 characters"})
        }else{
            setErrMsgs({...errMsgs, passwordErr: ""})
        }
    }, [formData.password])

    return(
        <>
        {loading && <div className="loaderBox fullTop"><Loader /></div>}
        <div>
            <div className={styles.inputGroup}>
              <input name="email" type="email" value={formData.email} onChange={handleFormDataChange} placeholder="Email address" required />
              <p className="errMsg">{errMsgs.emailErr}</p>
            </div>

            <div className={styles.inputGroup}>
              <input name="password" value={formData.password} onChange={handleFormDataChange} type="password" placeholder="Password" autoComplete="off" required />
              
              <p className="errMsg">{errMsgs.passwordErr}</p>
            </div>

            <p style={{marginBottom: 10, marginTop: -20, marginRight: 10, textAlign: 'right', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer'}}>
                Forgot Password?
            </p>

            <button onClick={login} className={styles.loginBtn}>Login</button>
        </div>
        </>
    )
}

export default LoginForm