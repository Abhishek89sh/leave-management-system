"use client"

import React, { useEffect, useState } from 'react'
import DataTable from '../../../../../components/data-table/DataTable'
import FilterBar from '../../../../../components/filterbar/FilterBar'
import Loader from '../../../../../components/loader/Loader';
import { getCookie } from '../../../../../functions/cookies';
import { useConfirm } from '../../../../../Context/ConfirmDialog/ConfirmDialogProvider';
import { useRouter } from 'next/navigation';
import details from '../../../../../functions/details';

function page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const Confirm = useConfirm();
  const router = useRouter();

  const readData = async ()=>{
    const auth = getCookie("auth");
    if(!auth){
      await Confirm("Token Expired or not available, Please login again");
      setLoading(false);
      return
    }
    setLoading(true);
    const res = await fetch(`/api/leaves/my-leaves?auth=${auth}`);
    const resData = await res.json();
    if(resData.isSuccess){
      let initialData = resData.data;
      let finalData = [];
      initialData.forEach((item)=>{
        finalData.push({id: item._id, name: item.name,designation: item.designation, purpose: item.purpose, status: item.status == "approved" || item.status == "rejected"?item.status:"pending"});
      })
      setData(finalData);
    }else{
      await Confirm(resData.message, "Error", false);
    }
    setLoading(false);
  }

  const onView = async (id)=>{
    const userDetaiils = await details();
    router.push(`/dashboard/${userDetaiils.role}/leave-info/${id}`);
  }
  
  useEffect(()=>{
    readData();
  }, [])

  if(loading) return <div className='loaderBox'><Loader /></div>
  return (
    <div className='mainBox'>
      <FilterBar />
      <DataTable data={data} onAccept={onView} showOneBtn={true} acceptText='View' />
    </div>
  )
}

export default page