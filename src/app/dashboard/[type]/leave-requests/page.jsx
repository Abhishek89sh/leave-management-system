"use client"

import React, { useEffect, useState } from 'react'
import DataTable from '../../../../../components/data-table/DataTable'
import FilterBar from '../../../../../components/filterbar/FilterBar'
import { getCookie } from '../../../../../functions/cookies';
import { useConfirm } from '../../../../../Context/ConfirmDialog/ConfirmDialogProvider';
import details from '../../../../../functions/details';
import { useRouter } from 'next/navigation';

function page() {
  const [data, setData] = useState(null);
  const Confirm = useConfirm();
  const router = useRouter();
  
  const fetchData = async ()=>{
    const auth = getCookie("auth");
    if(!auth){
      await Confirm("Token Expired or not found, Please Login again", "Token Expired", false);
      return;
    }
    const res = await fetch(`/api/leaves/requests?auth=${auth}`);
    const resData = await res.json();
        
    if(resData.isSuccess){
      let oldData = [...resData.data]
      let finalData = [];
      oldData.forEach((item)=>{
        finalData.push({requestBy: item.requestBy, id: item._id, name: item.userName, date: new Date(item.date).toLocaleDateString("en-GB")})
      })
      setData(finalData);
    }else{
      await Confirm(resData.message, "Error", false);
    }
  }

  const onRowCLick = async (item)=>{
    const userDetails = await details();
    router.push(`/dashboard/${userDetails.role}/leave-info/${item.id}`);
  }

  useEffect(()=>{
    fetchData();
  }, [])
  return (
    <div className='mainBox'>
      <FilterBar />
      <DataTable data={data} onRowClick={onRowCLick} showButtons={true}/>
    </div>
  )
}

export default page