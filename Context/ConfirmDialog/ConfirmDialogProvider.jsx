"use client"

import React, { createContext, useContext, useState } from 'react'
import styles from './confirm-dialog.module.css'


export const confirmDialogContext = createContext();

function ConfirmDialogProvider({children}) {
  const [confirmData, setConfirmData] = useState({message: "", heading: "", isOpen: false, resolve: null, showCancel: true});

  const confirm = ( message, heading = "Confirm Action", showCancel = true)=>{
    return new Promise((resolve)=>{
        setConfirmData({message, heading, isOpen: true, resolve, showCancel})
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
                    <h3>{confirmData.heading || "Confirm Action"}</h3>
                    <p>{confirmData.message || "Are you sure you want to continue"}</p>
                    <span>
                        <button onClick={handleAccept}>Ok</button>
                        {confirmData.showCancel && <button onClick={handleReject}>Cancel</button>}
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