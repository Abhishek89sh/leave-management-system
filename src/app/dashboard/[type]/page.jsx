"use client"

import React, { useEffect } from 'react'
import DashBoxes from '../../../../components/dashBoxes/DashBoxes';

function page({params}) {
  const {type} = React.use(params);
  return (
    <>
      <div style={{width: '100%'}}>
        <DashBoxes type={type} />
      </div>
    </>
  )
}

export default page
