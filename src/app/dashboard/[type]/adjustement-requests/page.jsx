"use client"

import React, { useEffect, useState } from 'react'
import DataTable from '../../../../../components/data-table/DataTable'
import FilterBar from '../../../../../components/filterbar/FilterBar'
import { getCookie } from '../../../../../functions/cookies';
import { useConfirm } from '../../../../../Context/ConfirmDialog/ConfirmDialogProvider';
import Loader from '../../../../../components/loader/Loader';

function page() {
  const [data, setData] = useState(null);
  const Confirm = useConfirm();
  const [loading, setLoading] = useState(false);

  const readData = async ()=>{
    const auth = getCookie("auth");
    if(!auth){
        await Confirm("Token expired or not found, Please login again", "Token Expired", false);
        return;
    }
    const res = await fetch(`/api/leaves/adjustments?auth=${auth}`);
    const resData = await res.json();
    if(resData.isSuccess){
        setData(resData.data);
    }else{
        await Confirm(resData.message, "Error", false);
    }
  }

  const acceptBtnCLick = async (item)=>{
    const ok = await Confirm(`Do you really want to accept ${item.name}'s adjustment request?`);
    if(!ok) return;
    updateStatus("approved", item._id);
  }

  const updateStatus = async (status, id)=>{
    const auth = getCookie("auth");
    if(!auth){
      await Confirm("Token Expired or not found, Please login again", "Token Expired", false);
      return;
    }
    setLoading(true);
    const res = await fetch("/api/leaves/adjustments", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        auth: auth,
        status: status,
        adjustmentId : id,
      })
    })
    const resData = await res.json();
    if(resData.isSuccess){
      let oldData = data;
      let newData = [];
      newData = oldData.filter((item)=> item._id !== id);
      setData(newData);
    }else{
      await Confirm(resData.message, "Error", false);
    }
    setLoading(false);
  }

  useEffect(()=>{
    readData();
  }, [])
  
  return (
    <div className='mainBox'>
      {loading && (<div className='loaderBox fullTop'><Loader /></div>)}
      <FilterBar />
      <DataTable data={data} onAccept={acceptBtnCLick} showButtons={true} />
    </div>
  )
}

export default page
