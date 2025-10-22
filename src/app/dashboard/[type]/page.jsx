"use client"

import React, { useEffect } from 'react'
import DashBoxes from '../../../../components/dashBoxes/DashBoxes';
import { useSelectUser } from '../../../../Context/selectUser/SelectUserProvider';

function page({params}) {
  const {type} = React.use(params);
  const selectUser = useSelectUser();
  const test = async ()=>{
    let selectedUser = await selectUser("Select Your Head");
    console.log(selectedUser);
  }
  useEffect(()=>{
    test()
  }, [])
  return (
    <>
      <div style={{width: '100%'}}>
        <DashBoxes type={type} />
      </div>
    </>
  )
}

export default page
