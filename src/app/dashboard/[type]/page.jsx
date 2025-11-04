"use client"

import React, { useEffect } from 'react'
import DashBoxes from '../../../../components/dashBoxes/DashBoxes';

function page({params}) {
  const {type} = React.use(params);
<<<<<<< HEAD
=======
  const selectUser = useSelectUser();
>>>>>>> c9618678ddf11905c2c76c30d3bd9ba25c159573
  return (
    <>
      <div style={{width: '100%'}}>
        <DashBoxes type={type} />
      </div>
    </>
  )
}

export default page
