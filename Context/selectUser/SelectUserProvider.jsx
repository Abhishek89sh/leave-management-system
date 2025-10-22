"use client"

import React, { createContext, useContext, useState } from 'react'

import styles from './selectUser.module.css'
import FilterBar2 from '../../components/filter-bar2/FIlterBar2';
import DataTable from '../../components/data-table/DataTable';

const SelectUserContext = createContext();

function SelectUserProvider({children}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [resolveFun, setResolveFun] = useState(null)
  const [showBox, setShowBox] = useState(false);
  const [heading, setHeading] = useState("Select User");
  const selectUser = (heading="Select User")=>{
    return new Promise((resolve)=>{
        setShowBox(true);
        setResolveFun(()=>resolve);
        setHeading(heading)
    })
  }

  const addBtnClick = ()=>{
    setShowBox(false);
    resolveFun("SAMPLE_USER_ID")
  }

  let data = [
    {name: "Abhishek", trade: "CSE"},
    {name: "Abhishek", trade: "CSE"},
    {name: "Abhishek", trade: "CSE"},
    {name: "Abhishek", trade: "CSE"},
    {name: "Abhishek", trade: "CSE"},
  ]
  return (
    <SelectUserContext.Provider value={selectUser}>
        {children}
        {showBox && (
            <div className={styles.selectUser}>
                <div>
                  <button onClick={()=>setShowBox(false)} className={styles.crossBtn}>✕</button>
                    <h2>{heading}</h2>
                    <section style={{marginTop: 20, width: '100%', overflow: 'visible'}}>
                        <FilterBar2 />
                    </section>
                    <section>
                      <DataTable onAccept={addBtnClick} showOneBtn={true} acceptText='Add' data={data} />
                    </section>
                </div>
            </div>
        )}
    </SelectUserContext.Provider>
  )
}

export const useSelectUser = ()=>{
    return useContext(SelectUserContext)
}

export default SelectUserProvider