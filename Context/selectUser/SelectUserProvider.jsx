"use client"

import React, { createContext, useContext, useState } from 'react'

import styles from './selectUser.module.css'
import FilterBar2 from '../../components/filter-bar2/FIlterBar2';
import DataTable from '../../components/data-table/DataTable';
import Loader from '../../components/loader/Loader';

const SelectUserContext = createContext();

function SelectUserProvider({children}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [resolveFun, setResolveFun] = useState(null)
  const [showBox, setShowBox] = useState(false);
  const [heading, setHeading] = useState("Select User");
  const [data, setData] = useState(null);
  const selectUser = (headingg="Select User")=>{
    return new Promise((resolve)=>{
        setShowBox(true);
        setResolveFun(()=>resolve);
        setHeading(headingg);
        if(headingg === "Select Your Head"){
          fetchHeads();
        }
    })
  }

  const fetchHeads = async ()=>{
    setData(null);
    const res = await fetch(`/api/heads?auth=68feaf5034217c807b4a83be&skips=0`);
    const data = await res.json();
    setData(data.data);
  }

  const addBtnClick = (id)=>{
    setShowBox(false); 
    resolveFun(id)
  }

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
                      {data?<>
                        {data.length > 0?<>
                          <DataTable onAccept={addBtnClick} showOneBtn={true} acceptText='Add' data={data} />
                        </>:<div><p>No Data</p></div>}
                      </>:<div className='loaderBox'><Loader /></div>}
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