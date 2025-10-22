"use client"

import React, { createContext, useContext, useState } from 'react'
import styles from './confirm-dialog.module.css'


export const confirmDialogContext = createContext();

function ConfirmDialogProvider({children}) {
  const [confirmData, setConfirmData] = useState({message: "", isOpen: false, resolve: null});

  const confirm = (message)=>{
    return new Promise((resolve)=>{
        setConfirmData({message, isOpen: true, resolve})
    })
  }

  const handleAccept = ()=>{
    if(confirmData.resolve) confirmData.resolve(true);
    setConfirmData({...confirmData, isOpen: false});
  }

  const handleReject = ()=>{
    if(confirmData.resolve) confirmData.resolve(false);
    setConfirmData({...confirmData, isOpen: false});
  }
  return (
    <confirmDialogContext.Provider value={confirm}>
        {children}
        {confirmData.isOpen && (
            <div className={styles.dialogBox}>
                <div>
                    <h3>{"Confirm Action"}</h3>
                    <p>{confirmData.message || "Are you sure you want to continue"}</p>
                    <span>
                        <button onClick={handleReject}>Cancel</button>
                        <button onClick={handleAccept}>Ok</button>
                    </span>
                </div>
            </div>
        )}
    </confirmDialogContext.Provider>
  )
}

export const useConfirm = ()=>{
    return useContext(confirmDialogContext)
}

export default ConfirmDialogProvider