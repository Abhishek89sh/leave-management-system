"use client"

import React, { createContext, useContext, useState } from 'react'

import styles from './selectUser.module.css'
import FilterBar2 from '../../components/filter-bar2/FIlterBar2';
import DataTable from '../../components/data-table/DataTable';
import Loader from '../../components/loader/Loader';
import { getCookie } from '../../functions/cookies';

const SelectUserContext = createContext();

function SelectUserProvider({children}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [resolveFun, setResolveFun] = useState(null)
  const [showBox, setShowBox] = useState(false);
  const [heading, setHeading] = useState("Select User");
  const [data, setData] = useState(null);
  const [errMsg, setErrMsg] = useState("No Data");
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
    const auth = getCookie("auth");
    const res = await fetch(`/api/heads?auth=${auth}&skips=0`);
    const data = await res.json();
    if(data.isSuccess){
      setData(data.data);
    }else{
      setErrMsg(data.message);
      setData([]);
    }
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
                        </>:<div><p>{errMsg}</p></div>}
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